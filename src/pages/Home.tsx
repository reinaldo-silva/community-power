import React, { useCallback, useEffect, useState } from "react";
import { BodyPage } from "../components/BodyPage";
import { Button } from "../components/Button";
import { CardPost, Post } from "../components/CardPost";
import { api } from "../service/api";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>();

  const getTimelineData = useCallback(async () => {
    await api
      .get<Post[]>("posts")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log({ err });
        return err;
      });
  }, []);

  useEffect(() => {
    getTimelineData();
    console.log("aqui");
  }, []);

  return (
    <BodyPage breadcrumbs={[{ description: "Home", to: "/" }]}>
      <div className="flex flex-col w-full h-full gap-8">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-bold ">Linha do tempo</h1>
          <div className="w-[200px]">
            <Button description="Novo post" />
          </div>
        </div>
        <div className="w-full h-auto grid grid-cols-3 gap-4 pb-8">
          {posts?.map((post) => (
            <CardPost
              key={post.id}
              loadTimeline={getTimelineData}
              post={post}
            />
          ))}
        </div>
      </div>
    </BodyPage>
  );
};

export { Home };
