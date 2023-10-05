import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useMessages } from "../../hooks";
import { AbsoluteLoader } from "../Loader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export const ChatRoom = () => {
  const [user, userLoading] = useAuth();
  const navigate = useNavigate();
  const [messages, loading] = useMessages();
  const timeoutRef = useRef();

  useLayoutEffect(() => {
    // Redirect with fake delay to login page if user is not logged in
    if (!user && !userLoading) {
      const timeout = setTimeout(async () => {
        navigate("/login");
      }, 2000);
      timeoutRef.current = timeout;
    }
  }, [navigate, user, userLoading]);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col grow m-2 rounded-lg border-gray-600 border max-w-[600px] relative">
        {loading && <AbsoluteLoader />}
        <MessageList messages={messages} />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
