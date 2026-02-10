import io from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : import.meta.env.VITE_BACKEND_URL;

let socket = null;

export const initializeSocket = (userId) => {
	if (socket) {
		socket.disconnect();
	}

	socket = io(SOCKET_URL, {
		// it comes from server socket middleware 
		auth: { userId },
	});
};

export const getSocket = () => {
	if (!socket) {
		throw new Error("Socket not initialized");
	}
	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};
