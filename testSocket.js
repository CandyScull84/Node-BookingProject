const { io } = require("socket.io-client");

const socket = io("https://hotell-lunden-backend.onrender.com");

socket.on("connect", () => {
  console.log("✅ Ansluten till Socket.IO:", socket.id);
});

socket.on("bookingCreated", (data) => {
  console.log("📢 Bokning skapad:", data);
});

socket.on("disconnect", () => {
  console.log("🔌 Frånkopplad från server");
});
