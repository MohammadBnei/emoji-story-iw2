import { signal } from "@preact/signals-react";
import { ClientToServerEvent, ServerToClientEvent } from "interface/event";
import { Socket, io } from "socket.io-client";

const client: Socket<ServerToClientEvent, ClientToServerEvent> = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000"
);
export const socket = signal<typeof client>(client);
