---
title: "Void Survivor"
description: "A fast-paced 2D survival shooter game built with Godot, featuring dynamic wave systems."
date: "2026-01-25"
tags: ["Godot", "GDScript", "GameDev"]
thumbnail: ""
---

# Mission Briefing

**Void Survivor** places you in the cockpit of a lone starfighter against endless swarms of alien hostiles.

## Gameplay Mechanics

- **Dynamic Stage System**: A data-driven stage manager that scales difficulty, enemy variety, and spawn rates over time.
- **Smart Spawning Logic**: Aliens spawn off-screen with minimum distance checks to prevent unfair "spawn-on-top" deaths.
- **Weapon Variety**: Expandable weapon system including rapid-fire blasters and area-of-effect missiles.

## Under the Hood

Built in **Godot 4**, this project makes heavy use of Signals for decoupled architecture. The stage configuration is entirely JSON-driven, allowing for rapid balancing tweaks without code changes.