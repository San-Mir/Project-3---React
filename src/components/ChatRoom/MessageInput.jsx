import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../hooks";
import { firebase } from "../../services";

export const MessageInput = ({ roomId }) => {
  const [user] = useAuth();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase.sendMessage(user, value, roomId);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-control w-full">
      <div className="input-group rounded-lg">
        <input
          type="text"
          placeholder="Enter a message"
          className="input input-bordered w-full !outline-none"
          value={value}
          onChange={handleChange}
          required
          minLength={1}
        />
        <button type="submit" disabled={!value} className="btn btn-square">
          <AiOutlineSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
