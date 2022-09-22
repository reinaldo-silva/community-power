import {
  ArrowRight,
  ChartLineUp,
  Heart,
  PencilSimpleLine,
} from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/Auth";
import { api } from "../service/api";

interface User {
  id: string;
  name: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

interface Likes {
  id: string;
  createdAt: Date;
  userId: string;
  postId: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  evaluation: number;
  updatedAt: Date;
  createdAt: Date;
  user: User;
  likes: Likes[];
}

interface CardPOstProps {
  post: Post;
  loadTimeline: () => void;
}

const CardPost: React.FC<CardPOstProps> = ({ post, loadTimeline }) => {
  const { cookies } = useAuthContext();
  const [likedPost, setLikedPost] = useState<any>();

  const handleLiked = useCallback(() => {
    if (!cookies.id) {
      return alert("Necessário realizar um login");
    }
    api
      .patch(`/likes/${post?.id}`)
      .then(() => {
        loadTimeline();
      })
      .catch(() => {});
  }, [post]);

  useEffect(() => {
    const likeTrue = post.likes.find((like) => like.userId === cookies.id);

    setLikedPost(!!likeTrue ? "fill" : "bold");
  }, [post, cookies]);

  return (
    <div className="w-full h-auto bg-slate-800 shadow-md rounded-md min-h-[200px]">
      <div className="bg-slate-700 rounded-t-md p-2 px-4 flex items-center gap-2 w-full truncate font-bold text-sm">
        <PencilSimpleLine size={16} weight="bold" />
        {post.user?.name || ""}
      </div>
      <div className="p-4 flex flex-1 flex-col justify-between gap-6">
        <div>
          <h2 className="text-xl text-zinc-100 font-bold">{post.title}</h2>
          <p className="text-md text-zinc-200 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <Link
            to={`/post/${post.slug}`}
            className="flex items-center gap-2 hover:underline"
          >
            <span className="text-sm font-bold">Ler mais</span>

            <ArrowRight size={16} weight="bold" />
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Heart
                size={20}
                weight={likedPost}
                className="cursor-pointer"
                onClick={handleLiked}
              />
              <span className="font-bold text-sm">{post.likes.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartLineUp size={20} weight="bold" />
              <span className="font-bold text-sm">
                {`${post.evaluation} %`}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardPost };
