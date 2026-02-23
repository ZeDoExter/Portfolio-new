---
title: "Graph With Gui"
description: "A Java Swing application that visualizes graph algorithms like BFS, DFS, Dijkstra, Kruskal, and Prim interactively."
layout: "A"
date: "2024-04-01"
tags: ["Java", "Algorithms", "Swing"]
thumbnail: "/projects/graphwithgui/1.png"
---

# Interactive Graph Algorithms

**GraphWithGui** is a desktop application written in Java that provides a visual interface for constructing graphs and observing classic graph algorithms in action.

## Key Features

- **Algorithm Visualization**: Step-by-step or automatic execution of various graph algorithms.
- **Supported Algorithms**:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra's Shortest Path
  - Kruskal's Minimum Spanning Tree
  - Prim's Minimum Spanning Tree
- **Interactive Graph Creation**: Add vertices and edges directly on the canvas to build custom networks.

## Live Web App

Thanks to the integration of **CheerpJ**, this Java Swing application is fully playable within the browser. The execution engine converts the Java bytecode into WebAssembly on the fly!

### Basic Usage

The status message at the bottom of the window guides you through each step (such as selecting a start node or adding edges).

**Left Click** on empty space - Create a vertex.

**Left Click** on two vertices - Create an edge between them.

**Right Click** on a vertex or edge - Modify properties such as label or weight.

After building your graph, select an algorithm and follow the on-screen instructions to see the visualization in action.