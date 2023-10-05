import { useEffect, useState } from "react";
import { firebase } from "../services";

export const useMessages = (roomId) => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    const unsubscribe = firebase.getMessages(setMessages, roomId);
    return unsubscribe;
  }, [roomId]);

  return [messages, messages === undefined];
};
