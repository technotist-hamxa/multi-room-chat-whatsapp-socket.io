import { io } from "socket.io-client";

export const socket = io(); // auto-connects to your Nuxt server
