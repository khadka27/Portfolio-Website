"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/chatbot"), {
  loading: () => null,
});

export default Chatbot;
