import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.SOCKET_URL || "http://localhost:3000";
// Byt URL till din backend-server om den inte körs lokalt

const socket = io(SOCKET_URL);

export default socket;