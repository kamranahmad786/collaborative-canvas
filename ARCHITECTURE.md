Each draw action is modeled as a stroke containing multiple points.
The server stores strokes as the global source of truth.
Undo removes the last stroke created by the requesting socket.
Clients redraw the entire canvas from synchronized state.
