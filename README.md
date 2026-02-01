#  Real-Time Collaborative Drawing Canvas

A real-time multi-user drawing application where multiple users can draw simultaneously on a shared canvas.  
Built using **HTML5 Canvas**, **Node.js**, and **WebSockets (Socket.io)** with server-authoritative state synchronization.

---

## Features

-  Real-time collaborative drawing
-  Multi-user synchronization using WebSockets
-  Server-side authoritative state
-  Global Clear Canvas (Undo) functionality
-  Retina / HiDPI display support
-  Low-latency drawing updates
-  Clean client–server architecture
-  No third-party canvas libraries (pure Canvas API)

---

##  Tech Stack

### Frontend
- HTML5 Canvas API
- Vanilla JavaScript (ES Modules)
- CSS (modern UI styling)

### Backend
- Node.js (v18+)
- Express.js
- Socket.io (WebSocket communication)

---

##  Project Structure

```
collaborative-canvas/
├── .gitignore
├── ARCHITECTURE.md
├── README.md
├── client/
│   ├── canvas.js
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   └── websocket.js
├── package-lock.json
├── package.json
└── server/
    ├── rooms.js
    ├── server.js
    └── state-manager.js
```



##  Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/<your-username>/collaborative-canvas.git
cd collaborative-canvas


2️⃣ Install dependencies
npm install

3️⃣ Start the server
npm start

Server runs at:
http://localhost:3000

- How to Test Real-Time Collaboration

- Open two browser windows

- One normal window

- One incognito window

Open in both:

http://localhost:3000


Draw in one window
➜ Drawing appears instantly in the other window

Click Undo
➜ Canvas clears for all connected users


Undo Behavior (Clear Canvas)

The Undo button clears the entire canvas

Clears server-side state

Syncs instantly across all users

No hidden or saved history

This behavior mimics “Clear Board” functionality found in professional whiteboard tools.


Architecture Overview

Server maintains the single source of truth

Clients send completed strokes to the server

Server broadcasts drawing updates to all clients

Canvas redraws are deterministic and flicker-free

No client-side trust for global state

Detailed explanation available in ARCHITECTURE.md.
