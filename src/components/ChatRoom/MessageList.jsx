import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks";
import { formatChatTimeFromTimestamp } from "../../utils";

export const MessageList = ({ messages }) => {
  const containerRef = useRef(null);
  const messageRef = useRef(null);
  const [user] = useAuth();
  const [hasScrolled, setHasScrolled] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current && messageRef.current) {
      const scrollThreshold = messageRef.current.clientHeight * 2;
      // Check if bootom of container is close to the bottom of the scrollable area
      const isCloseToBottom =
        containerRef.current.scrollHeight -
          containerRef.current.scrollTop -
          containerRef.current.clientHeight <
        scrollThreshold;
      // If it is, scroll down to the bottom
      if (isCloseToBottom || !hasScrolled) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  });

  return (
    <div
      className="grow overflow-x-hidden overflow-y-auto p-2"
      ref={containerRef}
      onScroll={() => setHasScrolled(true)}
      style={{ height: "calc(100vh - 200px)" }}
    >
      <ul className="flex flex-col gap-2">
        {messages?.map((message, idx) => {
          const isOwnMessage = message.user.id === user.uid;
          const {
            user: { name, displayName, email, phoneNumber },
            timestamp,
            text,
          } = message;
          return (
            <li
              key={message.id}
              ref={idx + 1 === messages.length ? messageRef : null}
              className="w-full"
            >
              <div
                className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header">
                  {isOwnMessage
                    ? "You"
                    : displayName || name || email || phoneNumber}
                  <time className="text-xs opacity-50 mx-1">
                    {timestamp
                      ? formatChatTimeFromTimestamp(timestamp.seconds * 1000)
                      : "Now"}
                  </time>
                </div>
                <div className="chat-bubble">{text}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageList;
