import { backendBaseUrl, backendWsUrl } from "../constants/constants";

/**
 * Creates and manages a WebSocket connection to a chat room.
 *
 * @param {string} roomName - The chat room identifier (e.g. 'world' or sorted direct chat id)
 * @param {object} callbacks - Event callbacks: onMessage, onTyping, onConnect, onDisconnect
 * @returns {object} Controller with send, sendTyping, and close methods
 */
export function createChatSocket(roomName = "world", { onMessage, onTyping, onConnect, onDisconnect } = {}) {
  const wsUrl = `${backendWsUrl}/ws/chat/${encodeURIComponent(roomName)}/`;
  let socket = null;
  let isClosedExplicitly = false;
  let reconnectTimer = null;

  const connect = () => {
    try {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        if (onConnect) onConnect();
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "chat_message" && onMessage) {
            onMessage(data);
          } else if (data.type === "typing" && onTyping) {
            onTyping(data);
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      socket.onclose = () => {
        if (onDisconnect) onDisconnect();
        if (!isClosedExplicitly) {
          // Attempt reconnect after 3 seconds
          reconnectTimer = setTimeout(connect, 3000);
        }
      };

      socket.onerror = (err) => {
        console.warn("WebSocket encountered error:", err);
      };
    } catch (err) {
      console.error("Failed to establish WebSocket connection:", err);
    }
  };

  connect();

  return {
    send: (payload) => {
      const msgData = {
        type: "chat_message",
        ...payload,
      };
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msgData));
        return true;
      }
      return false;
    },
    sendTyping: (username, isTyping = true) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: "typing",
          username,
          is_typing: isTyping,
        }));
      }
    },
    close: () => {
      isClosedExplicitly = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket) {
        socket.close();
      }
    },
  };
}

/**
 * Fetches message history for a given room from MongoDB via the REST API.
 */
export async function fetchRoomMessages(roomName = "world") {
  try {
    const url = roomName === "world"
      ? `${backendBaseUrl}/api/messages/?room=world`
      : `${backendBaseUrl}/api/chats/${encodeURIComponent(roomName)}/messages/`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch messages: ${res.statusText}`);
    }
    const data = await res.json();
    return data.messages || [];
  } catch (err) {
    console.error("fetchRoomMessages error:", err);
    return [];
  }
}
