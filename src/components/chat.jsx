"use client";
import API_BASE_URL from "@/apiorder/const";
import { SocketContext } from "@/context/socket";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Chat(params) {
  const socket = useContext(SocketContext);
  const room = params.room;
  const [msg, setMsg] = useState();
  const [msgReceived, setMsgReceived] = useState(params.msg);
  const sendMessage = () => {
    socket.emit("send message", { msg, room });
    setMsgReceived((prev) => [
      ...prev,
      { message: msg, sendByCust: params.isCust },
    ]);
    axios
      .post(`${API_BASE_URL}/chat`, {
        order_id: room,
        sendByCust: params.isCust,
        message: msg,
      })
      .then((res) => console.log(res));
    setMsg("");
  };

  useEffect(() => {
    console.log(msgReceived);
    socket.on("chat message", (msg) => {
      console.log(msg);
      setMsgReceived((prev) => [
        ...prev,
        { message: msg, sendByCust: !params.isCust },
      ]);
    });
  }, [socket]);

  return (
    <div>
      <div className="px-16">
        {msgReceived.map((e) => (
          <div
            className={
              e.sendByCust == params.isCust ? "text-right" : "text-left"
            }
          >
            {e.message}
          </div>
        ))}
      </div>

      <div>
        <input
          className="text-black"
          placeholder="message.."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
}
