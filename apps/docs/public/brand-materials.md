# Aramon brand materials

Reusable public media for Aramon applications. These assets are intentionally quiet: use them to establish an entry or first-view moment, not as ambient decoration on dense product screens.

## Preloader

Assets:

- `https://ui.aramon.ma/aramon/brand/preloader/preloading-poster.jpg`
- `https://ui.aramon.ma/aramon/brand/preloader/preloading.mp4`

Use a solid black page backdrop with a centered square viewport no larger than 500px (`min(500px, 86vw)`). Preserve the original composition with `object-fit: contain`; do not crop or stretch the film. Use the poster as the immediate visual, then preload the muted, inline video. Preserve the existing preloader behavior: autoplay when permitted, loop until the host app is ready, and transition into the application with a 420–650ms blur-and-opacity fade-out. Respect `prefers-reduced-motion`, Save Data, and slow connections by keeping the poster visible and skipping playback when appropriate. The video is decorative and must remain hidden from assistive technology.

```tsx
<div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "#000" }}>
  <div style={{ width: "min(500px, 86vw)", aspectRatio: "1", background: "#000" }}>
    <video
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      poster="/aramon/brand/preloader/preloading-poster.jpg"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    >
      <source src="/aramon/brand/preloader/preloading.mp4" type="video/mp4" />
    </video>
  </div>
</div>
```

## Landing hero

Assets:

- `https://ui.aramon.ma/aramon/brand/hero/aramon-hero-poster.jpg`
- `https://ui.aramon.ma/aramon/brand/hero/aramon-hero.webm`
- `https://ui.aramon.ma/aramon/brand/hero/aramon-hero.mp4`

Use the original aspect ratio with centered, cover fitting. Place readable hero content above the media and apply the Aramon dark scrim so text contrast does not depend on a particular video frame. Prefer WebM, retain MP4 fallback, autoplay muted inline, and use the poster under reduced motion, Save Data, or unsupported playback conditions.

```tsx
<video
  autoPlay
  muted
  playsInline
  loop
  preload="metadata"
  poster="/aramon/brand/hero/aramon-hero-poster.jpg"
  aria-hidden="true"
  className="absolute inset-0 size-full object-cover"
>
  <source src="/aramon/brand/hero/aramon-hero.webm" type="video/webm" />
  <source src="/aramon/brand/hero/aramon-hero.mp4" type="video/mp4" />
</video>
```

Recommended scrim: `linear-gradient(180deg, rgb(0 0 0 / .08), rgb(0 0 0 / .52))`.
