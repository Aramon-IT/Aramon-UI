import type { MediumInteraction, MediumPhysicsOptions } from "./core";

type PhysicsTier = "full" | "reduced" | "flat";

export interface MediumController {
  destroy(): void;
  wake(): void;
}

const CELL = 10;
const WAVE = 0.42;
const DAMP_V = 0.968;
const DAMP_H = 0.984;
const SMOOTH = 0.14;
const QUIET = 0.0012;
const SUPERSAMPLE = 2;
const GAIN = 1.5;

function detectTier(): PhysicsTier {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noHover = typeof matchMedia === "function" && matchMedia("(hover: none)").matches;
  if (reducedMotion || connection?.saveData) return "flat";
  if (noHover || (navigator.hardwareConcurrency || 8) <= 4) return "reduced";
  return "full";
}

function readRgb(element: HTMLElement): [number, number, number] {
  const values = getComputedStyle(element)
    .getPropertyValue("--aramon-glint")
    .split(",")
    .map((value) => Number.parseInt(value.trim(), 10));
  return [values[0] || 218, values[1] || 235, values[2] || 226];
}

class PhysicsDirector {
  private pools = new Set<MediumPool>();
  private frame = 0;
  private maxActive = 2;

  add(pool: MediumPool, requestedMax?: number) {
    this.pools.add(pool);
    if (requestedMax) this.maxActive = Math.max(1, Math.min(4, requestedMax));
    if (this.pools.size === 1) {
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      window.addEventListener("scroll", this.onScroll, { passive: true });
    }
  }

  remove(pool: MediumPool) {
    this.pools.delete(pool);
    if (!this.pools.size) {
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
      window.removeEventListener("scroll", this.onScroll);
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
  }

  requestFrame() {
    if (!this.frame && !document.hidden) this.frame = requestAnimationFrame(this.tick);
  }

  private onVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      return;
    }
    this.requestFrame();
  };

  private onScroll = () => {
    for (const pool of this.pools) pool.refreshPointerOrigin();
  };

  private tick = () => {
    this.frame = 0;
    const active = [...this.pools]
      .filter((pool) => pool.shouldAnimate)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, this.maxActive);

    let keepGoing = false;
    for (const pool of active) keepGoing = pool.step() || keepGoing;
    if (keepGoing) this.requestFrame();
  };
}

const director = new PhysicsDirector();

class MediumPool implements MediumController {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private heights = new Float32Array(0);
  private velocities = new Float32Array(0);
  private scratch = new Float32Array(0);
  private image: ImageData | null = null;
  private glint: [number, number, number] = [218, 235, 226];
  private cols = 0;
  private rows = 0;
  private visible = true;
  private awake = false;
  private destroyed = false;
  private lastX = 0;
  private lastY = 0;
  private rect: DOMRect | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private tier: PhysicsTier;
  private interaction: MediumInteraction;
  priority = 0;

  constructor(private element: HTMLElement, options: MediumPhysicsOptions) {
    this.tier = detectTier();
    this.interaction = options.interaction ?? "stir";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "aramon-medium__fluid";
    this.canvas.setAttribute("aria-hidden", "true");
    const context = this.canvas.getContext("2d", { alpha: true });
    if (!context) {
      this.canvas.remove();
      throw new Error("Aramon Medium requires a 2D canvas context.");
    }
    this.context = context;
    this.element.append(this.canvas);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(element);
    } else {
      window.addEventListener("resize", this.onWindowResize, { passive: true });
    }

    if (typeof IntersectionObserver !== "undefined") {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        const wasVisible = this.visible;
        this.visible = entry?.isIntersecting ?? false;
        if (!this.visible) this.reset();
        if (this.visible && !wasVisible && this.tier !== "flat" && this.interaction !== "off") {
          requestAnimationFrame(() => this.seed());
        }
      }, { rootMargin: "120px" });
      this.intersectionObserver.observe(element);
    }

    this.element.addEventListener("mousedown", this.onPointerDown, { passive: true });
    this.element.addEventListener("touchstart", this.onTouchStart, { passive: true });
    if (this.interaction === "stir") this.element.addEventListener("mousemove", this.onPointerMove, { passive: true });
    director.add(this, options.maxActive);
    this.resize();
    this.element.dataset.mediumEngine = this.tier === "flat" ? "static" : "canvas";
    if (this.tier !== "flat" && this.interaction !== "off") {
      requestAnimationFrame(() => this.seed());
    }
  }

  get shouldAnimate() {
    return this.visible && this.awake && !this.destroyed && this.tier !== "flat" && this.interaction !== "off";
  }

  wake() {
    if (this.tier === "flat" || this.interaction === "off") return;
    this.awake = true;
    this.element.dataset.mediumActive = "true";
    this.priority = performance.now();
    director.requestFrame();
  }

  refreshPointerOrigin() {
    this.rect = null;
  }

  step() {
    if (!this.shouldAnimate || this.cols < 3 || this.rows < 3) return false;
    let energy = 0;

    for (let y = 1; y < this.rows - 1; y += 1) {
      for (let x = 1; x < this.cols - 1; x += 1) {
        const index = y * this.cols + x;
        const average = (
          this.heights[index - 1] + this.heights[index + 1] +
          this.heights[index - this.cols] + this.heights[index + this.cols]
        ) * 0.25;
        this.velocities[index] = (this.velocities[index] + (average - this.heights[index]) * WAVE) * DAMP_V;
        const next = (this.heights[index] + this.velocities[index]) * DAMP_H;
        this.scratch[index] = next;
        energy += Math.abs(next) + Math.abs(this.velocities[index]);
      }
    }

    for (let y = 1; y < this.rows - 1; y += 1) {
      for (let x = 1; x < this.cols - 1; x += 1) {
        const index = y * this.cols + x;
        const neighbor = (
          this.scratch[index - 1] + this.scratch[index + 1] +
          this.scratch[index - this.cols] + this.scratch[index + this.cols]
        ) * 0.25;
        this.heights[index] = this.scratch[index] * (1 - SMOOTH) + neighbor * SMOOTH;
      }
    }

    this.render();
    const averageEnergy = energy / (this.cols * this.rows);
    if (averageEnergy < QUIET) {
      this.awake = false;
      delete this.element.dataset.mediumActive;
      return false;
    }
    return true;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    window.removeEventListener("resize", this.onWindowResize);
    this.element.removeEventListener("mousedown", this.onPointerDown);
    this.element.removeEventListener("mousemove", this.onPointerMove);
    this.element.removeEventListener("touchstart", this.onTouchStart);
    this.canvas.remove();
    delete this.element.dataset.mediumEngine;
    delete this.element.dataset.mediumActive;
    director.remove(this);
  }

  private onWindowResize = () => this.resize();

  private seed() {
    if (this.destroyed || !this.visible || this.cols < 4 || this.rows < 4) return;
    const rect = this.element.getBoundingClientRect();
    this.disturb(
      rect.left + rect.width * 0.36,
      rect.top + rect.height * 0.4,
      this.tier === "reduced" ? 0.42 : 0.68,
      3.6,
    );
  }

  private resize() {
    const { width, height } = this.element.getBoundingClientRect();
    this.rect = null;
    const nextCols = Math.max(4, Math.ceil(width / CELL));
    const nextRows = Math.max(4, Math.ceil(height / CELL));
    if (nextCols === this.cols && nextRows === this.rows && this.image) return;
    this.cols = nextCols;
    this.rows = nextRows;
    this.heights = new Float32Array(this.cols * this.rows);
    this.velocities = new Float32Array(this.cols * this.rows);
    this.scratch = new Float32Array(this.cols * this.rows);
    this.canvas.width = this.cols * SUPERSAMPLE;
    this.canvas.height = this.rows * SUPERSAMPLE;
    this.image = this.context.createImageData(this.canvas.width, this.canvas.height);
    this.glint = readRgb(this.element);
    this.render();
  }

  private reset() {
    this.awake = false;
    delete this.element.dataset.mediumActive;
    this.heights.fill(0);
    this.velocities.fill(0);
    this.scratch.fill(0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private disturb(clientX: number, clientY: number, force: number, radius = 2.6) {
    const rect = this.rect ?? this.element.getBoundingClientRect();
    this.rect = rect;
    const cx = ((clientX - rect.left) / Math.max(1, rect.width)) * this.cols;
    const cy = ((clientY - rect.top) / Math.max(1, rect.height)) * this.rows;
    const minX = Math.max(1, Math.floor(cx - radius));
    const maxX = Math.min(this.cols - 2, Math.ceil(cx + radius));
    const minY = Math.max(1, Math.floor(cy - radius));
    const maxY = Math.min(this.rows - 2, Math.ceil(cy + radius));

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const distance = Math.hypot(x - cx, y - cy);
        if (distance < radius) this.velocities[y * this.cols + x] += force * (1 - distance / radius);
      }
    }
    this.wake();
  }

  private onPointerDown = (event: MouseEvent) => {
    if (this.interaction === "off") return;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.disturb(event.clientX, event.clientY, this.tier === "reduced" ? 0.72 : 1.05, 3.2);
  };

  private onPointerMove = (event: MouseEvent) => {
    const distance = Math.hypot(event.clientX - this.lastX, event.clientY - this.lastY);
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    if (distance < 2) return;
    this.disturb(event.clientX, event.clientY, Math.min(0.56, distance * 0.028), 2.5);
  };

  private onTouchStart = (event: TouchEvent) => {
    if (this.interaction === "off") return;
    const touch = event.touches[0];
    if (!touch) return;
    this.lastX = touch.clientX;
    this.lastY = touch.clientY;
    this.disturb(touch.clientX, touch.clientY, this.tier === "reduced" ? 0.72 : 1.05, 3.2);
  };

  private render() {
    if (!this.cols || !this.rows) return;
    const image = this.image;
    if (!image) return;
    const [red, green, blue] = this.glint;

    for (let y = 1; y < this.rows - 1; y += 1) {
      for (let x = 1; x < this.cols - 1; x += 1) {
        const index = y * this.cols + x;
        const dx = this.heights[index + 1] - this.heights[index - 1];
        const dy = this.heights[index + this.cols] - this.heights[index - this.cols];
        const light = Math.max(0, dx * 0.55 + dy * -0.83) * GAIN;
        const alpha = Math.min(108, Math.abs(light) * 92 + Math.abs(this.heights[index]) * 18);

        for (let sy = 0; sy < SUPERSAMPLE; sy += 1) {
          for (let sx = 0; sx < SUPERSAMPLE; sx += 1) {
            const pixel = ((y * SUPERSAMPLE + sy) * this.canvas.width + x * SUPERSAMPLE + sx) * 4;
            image.data[pixel] = red;
            image.data[pixel + 1] = green;
            image.data[pixel + 2] = blue;
            image.data[pixel + 3] = alpha;
          }
        }
      }
    }
    this.context.putImageData(image, 0, 0);
  }
}

export function attachMedium(element: HTMLElement, options: MediumPhysicsOptions = {}): MediumController {
  return new MediumPool(element, options);
}
