export function openSocket(params?: Record<string, string>) {
  let socketUrl = "ws://localhost:4000/socket";

  // crea una query con los datos de autenticación (jwt)
  if (params) {
    const socketParams =
      "?" +
      Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    socketUrl += socketParams;
  }

  const socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log("Conexión websocket abierta");
  };

  socket.onclose = () => {
    console.log("Conexión websocket cerrada");
  };

  return socket;
}
