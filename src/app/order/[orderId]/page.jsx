"use client";
import API_BASE_URL from "@/apiorder/const";
import Background from "@/components/background/Background";
import Chat from "@/components/chat";
import { SocketContext } from "@/context/socket";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function Page({ params }) {
  const role = useSearchParams().get('role');
  console.log(role);
  console.log("params", params);
  const Socket = useContext(SocketContext);
  Socket.emit("join-room", params.orderId);
  const [data, setData] = useState();
  useEffect(() => {
    axios.get(`${API_BASE_URL}/chat/${params.orderId}`).then((result) => {
      setData(result.data.data);
    });
  }, []);
  console.log(data);
  return (
    <div>
      <Background />
      <SocketContext.Provider value={Socket}>
        {data? <Chat room={params.orderId} msg={data} isCust={role=='U'}/> : null }
      </SocketContext.Provider>
    </div>
  );
}
