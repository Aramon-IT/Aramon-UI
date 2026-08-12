# Aramon Medium Animation Agent Prompt

Create a sealed component-local liquid field. The component is a rigid vessel; only its internal canvas responds. Keep text and controls above the render layer.

Use: cell 10px, wave 0.42, velocity damping 0.968, height damping 0.984, smoothing 0.14, light direction 0.55/-0.83, quiet threshold 0.0012, 2x supersampling, two optical blur passes, and gain 1.5.

Use one director loop and only a bounded number of recently touched pools. Suspend while hidden, reset offscreen pools, cache bounds, avoid unnecessary canvas reallocation, and clean up completely on detach.

Provide Full, Reduced, and Flat tiers. Full and Reduced retain pointer stir when a pointer is present; touch always receives a press impulse. Pair the canvas with a subtle transform-only CSS optical drift so Medium reads as living material when canvas, observers, or pointer movement are unavailable. Disable both layers for reduced motion. Initialize canvas physics only after hydration. Keep the core engine framework-independent and place `"use client"` only in the React adapter.

Medium must transmit its environment rather than behave like an opaque card. Keep the neutral material around 0.30-0.57 alpha by density, apply strong backdrop blur, preserve one thin edge highlight, and keep all text crisp above the optical layers.
