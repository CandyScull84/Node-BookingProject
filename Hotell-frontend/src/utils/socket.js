import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:8080";
// Byt URL till din backend-server om den inte körs lokalt

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
});

export default socket;