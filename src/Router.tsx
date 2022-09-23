import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChatCommunity } from "./pages/ChatCommunity";
import { Chats } from "./pages/Chats";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { PostPage } from "./pages/Post";
import { SignUp } from "./pages/SignUp";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chats/:chat" element={<ChatCommunity />} />
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  );
};

export { Router };
