import Link from "next/link";
import PostShow from "@/components/post/post-show";
import CommentList from "@/components/comment/comment-list";
import CommentCreateForm from "@/components/comment/comment-create-form";
import { path } from "@/path";
import { fetchCommentsByPostId } from "@/db/queries/comment";
import { Suspense } from "react";
import PostShowLoading from "@/components/loading-skeleton/PostShowLoading";

interface PostShowPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, id } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={path.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={id} />
      </Suspense>
      <CommentCreateForm postId={id} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(id)} />
    </div>
  );
}
