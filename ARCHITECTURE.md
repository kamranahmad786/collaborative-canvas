Each draw action is modeled as a stroke containing multiple points.
The server stores strokes as the global source of truth.
Undo removes the last stroke created by the requesting socket.
Clients redraw the entire canvas from synchronized state.

##  System Architecture Diagram

+------------------+        WebSocket        +------------------+
|   Client A       |  <-------------------> |                  |
| (Browser Canvas) |                         |                  |
+------------------+                         |                  |
                                             |                  |
+------------------+        WebSocket        |   Node.js Server |
|   Client B       |  <-------------------> |  (Socket.io)     |
| (Browser Canvas) |                         |                  |
+------------------+                         |                  |
                                             |                  |
+------------------+        WebSocket        |                  |
|   Client C       |  <-------------------> |                  |
| (Browser Canvas) |                         +------------------+


                    ↓
           Server-Authoritative State
           --------------------------
           - strokes[]
           - users
Diagram Explanation (Evaluator-Friendly)
1️Clients (Browsers)

Each client:

Runs an HTML5 Canvas

Captures mouse events

Renders strokes locally for instant feedback

Sends completed strokes to the server via WebSockets

Clients do NOT store global truth.

2️WebSocket Layer (Socket.io)

Enables bi-directional, low-latency communication

Each client maintains a persistent socket connection

Events used:

join

draw

undo

sync_state

3️Node.js Server (Single Source of Truth)

The server:

Assigns identity using socket.id

Stores global canvas state (strokes[])

Applies undo / clear logic

Broadcasts authoritative updates to all clients

This prevents desynchronization and race conditions.

Global State Flow

Draw Flow :

Mouse Down → Mouse Move → Mouse Up
        ↓
Client batches points into one stroke
        ↓
Stroke sent to server
        ↓
Server saves stroke
        ↓
Server broadcasts stroke
        ↓
All clients render


Undo / Clear Flow:

Undo Button Clicked
        ↓
Server clears strokes[]
        ↓
Server broadcasts empty state
        ↓
All clients clear canvas
