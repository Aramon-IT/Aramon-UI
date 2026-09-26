# Aramon preloader

The Aramon documentation site uses the branded preloader on the homepage (`/`) only. It is implemented as a reusable UI primitive plus a site-level wrapper.

## Source files

- Reusable component: `packages/ui/src/aramon-preloader.tsx`
- Homepage integration: `apps/docs/src/app/_components/site-preloader.tsx`
- Preloader styling and crop mask: `apps/docs/src/app/globals.css` (`.aramon-preloader` and `.site-preloader`)
- Component documentation: `/components/aramon-preloader/`

## Media paths

Repository paths:

- Video: `apps/docs/public/aramon/brand/preloader/preloading.mp4`
- Poster: `apps/docs/public/aramon/brand/preloader/preloading-poster.jpg`

Public URLs:

- Video: `https://ui.aramon.ma/aramon/brand/preloader/preloading.mp4`
- Poster: `https://ui.aramon.ma/aramon/brand/preloader/preloading-poster.jpg`

When another Aramon application consumes the asset from its own public directory, preserve these logical URLs:

```text
/aramon/brand/preloader/preloading.mp4
/aramon/brand/preloader/preloading-poster.jpg
```

## Runtime behavior

1. The wrapper renders only on the documentation homepage.
2. The poster is shown immediately to avoid a blank first frame.
3. After mount, the component checks `prefers-reduced-motion` and `navigator.connection.saveData`.
4. If playback is allowed, the muted MP4 is autoplayed inline and looped.
5. The preloader waits for the host page to report `ready`, then completes after a loop boundary or a bounded three-second media fallback. This prevents unavailable video metadata from blocking the application.
6. The exit waits for the 900ms minimum display duration, then applies the material easing fade/blur transition. The site wrapper unmounts when `onComplete` fires.
7. Media errors fall back to the poster and complete safely.

The video and poster are decorative (`aria-hidden="true"`); the outer primitive exposes `role="status"` with an accessible loading label.

## Layout and crop rule

The homepage backdrop is solid black. The media is displayed in a centered square capped at `min(500px, 86vw)` with `object-fit: contain`, so the source composition is never stretched or full-screen cropped. A black internal edge mask (`clamp(72px, 20vw, 120px)`) hides the supplied right-edge artifact without changing the source asset.

Do not use the preloader video as a dense-screen background. It is reserved for branded entry moments such as documentation entry, login, signup, confirmation, and join-session flows.

## Reuse example

```tsx
import { AramonPreloader } from "@aramon/ui/aramon-preloader";

<AramonPreloader
  src="/aramon/brand/preloader/preloading.mp4"
  poster="/aramon/brand/preloader/preloading-poster.jpg"
  ready={appReady}
  minimumDuration={900}
  onComplete={() => setLoading(false)}
/>
```

Keep the host wrapper responsible for the full-screen black backdrop and for removing the preloader after `onComplete`.
