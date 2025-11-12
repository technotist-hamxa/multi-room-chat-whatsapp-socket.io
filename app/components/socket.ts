import { io } from "socket.io-client";

export const socket = io({transports: ['websocket']}); // auto-connects to your Nuxt server
