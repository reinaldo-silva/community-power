import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChartLineUp, Clock, Heart, PencilSimpleLine } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BodyPage } from "../components/BodyPage";
import { Post } from "../components/CardPost";
import { Loading } from "../components/Loading";
import { useAuthContext } from "../context/Auth";
import { api } from "../service/api";

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post>();
  const { cookies } = useAuthContext();
  const [likedPost, setLikedPost] = useState<any>();

  const getPostData = useCallback(async () => {
    await api
      .get<Post>(`/posts/${slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => {});
  }, [slug]);

  const handleLiked = useCallback(() => {
    if (!cookies.id) {
      return alert("Necessário realizar um login");
    }

    api.patch(`/likes/${post?.id}`).then(() => {
      getPostData();
    });
  }, [post]);

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    if (post) {
      const likeTrue = post.likes.find((like) => like.userId === cookies.id);

      setLikedPost(!!likeTrue ? "fill" : "bold");
    }
  }, [post, cookies]);

  return (
    <BodyPage
      breadcrumbs={[
        { description: "Home", to: "/" },
        { description: post?.title || "", to: "#" },
      ]}
    >
      {post ? (
        <div className="flex justify-between w-full gap-8 py-4">
          <div className="flex flex-1 flex-col overflow-y-auto py-2">
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <p className="leading-relaxed p-4 text-lg">
              {post.description} Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Saepe illum deleniti, commodi nesciunt
              exercitationem tempora error vitae inventore recusandae
              necessitatibus veritatis dolor odio dolorem a impedit. Praesentium
              non at incidunt numquam voluptatibus repellat. Aliquid deserunt
              officia impedit minima minus esse obcaecati facere laboriosam,
              dolorem itaque aspernatur voluptas quo error dicta! Facilis eius
              non eveniet velit! Voluptates sint possimus iusto molestiae
              aliquid tenetur repellendus eius ab minus ipsum! Nihil veniam
              necessitatibus nesciunt unde tempore illo, laboriosam sequi, enim
              doloremque dolorem, aliquam ut est cumque repellendus laudantium
              nulla reiciendis mollitia! Quos optio dolores, repellat iste sit
              reiciendis rem vel asperiores velit tempore ab, recusandae cum
              consequuntur debitis expedita modi blanditiis nihil cupiditate.
              Enim quis iusto facere eveniet eos totam ad dolore aliquid.
              Asperiores, sit possimus. Deleniti quis fuga inventore accusantium
              asperiores tenetur, perferendis quisquam rem dicta veritatis,
              provident consectetur natus magnam sint! Maxime incidunt expedita
              beatae veniam nihil itaque, distinctio soluta quas culpa omnis
              architecto accusantium maiores, blanditiis mollitia illo eligendi,
              praesentium voluptatibus dolor ullam! Ut dignissimos doloremque
              magni corporis odio dolore deleniti molestias dolores, nihil
              aspernatur! Autem, id ab odit nesciunt aperiam ex aliquid impedit
              at? Suscipit quae eius dolor laborum quidem veritatis amet maxime
              alias ad numquam? Ipsum, neque consequuntur?
            </p>
          </div>
          <div className="w-[320px] h-full">
            <div className="w-full h-auto bg-slate-800 p-4 rounded-md shadow-lg">
              <h3 className="font-bold text-lg">Detalhes da postagem</h3>
              <ul className="flex flex-col p-2 gap-2">
                <li className="flex items-center gap-2">
                  <PencilSimpleLine size={20} weight="bold" />
                  <span>{post.user?.name || ""}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={20} weight="bold" />
                  <span>
                    {format(
                      new Date(post?.createdAt),
                      "EEEE' • 'd' de 'MMMM' • 'k'h'm",
                      { locale: ptBR }
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Heart
                    size={20}
                    weight={likedPost}
                    onClick={handleLiked}
                    className="cursor-pointer"
                  />
                  <span>{post?.likes.length}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChartLineUp size={20} weight="bold" />
                  <span>{post?.evaluation}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </BodyPage>
  );
};

export { PostPage };
