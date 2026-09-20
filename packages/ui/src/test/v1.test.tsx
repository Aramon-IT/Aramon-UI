import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { AnimatedList } from "../animated-list";
import { Button } from "../button";
import { MaterialBackground } from "../material-background";
import { NotificationBadge } from "../notification-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

describe("Aramon UI v1 contracts", () => {
  it("forwards refs and exposes loading semantics", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} loading loadingText="Saving">Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Saving" })).toHaveAttribute("aria-busy", "true");
  });

  it("uses semantic list markup and announces controlled changes", () => {
    const { rerender } = render(<AnimatedList items={["Mina"]} getKey={(item) => item} renderItem={(item) => <span>{item}</span>} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    rerender(<AnimatedList items={["Mina", "Lina"]} getKey={(item) => item} renderItem={(item) => <span>{item}</span>} />);
    expect(screen.getByText("2 items in the list.")).toHaveAttribute("aria-live", "polite");
  });

  it("gives notification state an explicit accessible label", async () => {
    const { container } = render(<NotificationBadge label="3 unread notifications" count={3}><button>Inbox</button></NotificationBadge>);
    expect(screen.getByRole("status", { name: "3 unread notifications" })).toBeInTheDocument();
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });

  it("supports keyboard tab changes", async () => {
    const user = userEvent.setup();
    render(<Tabs defaultValue="room"><TabsList><TabsTrigger value="room">Room</TabsTrigger><TabsTrigger value="people">People</TabsTrigger></TabsList><TabsContent value="room">Room panel</TabsContent><TabsContent value="people">People panel</TabsContent></Tabs>);
    const room = screen.getByRole("tab", { name: "Room" });
    room.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "People" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("People panel")).toBeInTheDocument();
  });

  it("renders a poster-first material fallback", () => {
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }) });
    const { container } = render(<MaterialBackground poster="/poster.webp" sources={[{ src: "/film.webm", type: "video/webm" }]} />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/poster.webp");
  });

  it("pauses and resumes material video with document visibility", async () => {
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) });
    Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: false } });
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
    const { container } = render(<MaterialBackground poster="/poster.webp" sources={[{ src: "/film.webm", type: "video/webm" }]} />);
    await waitFor(() => expect(container.querySelector("video")).toBeInTheDocument());
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(pause).toHaveBeenCalled();
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(play).toHaveBeenCalled();
  });
});
