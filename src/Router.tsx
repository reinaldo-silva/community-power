import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Route path="/post/:slug" element={<PostPage />} />
    </Routes>
  );
};

export { Router };
