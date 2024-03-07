import Link from "next/link";
import PostShow from "@/components/post/post-show";
import CommentList from "@/components/comment/comment-list";
import CommentCreateForm from "@/components/comment/comment-create-form";
import { path } from "@/path";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={path.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      {/* <PostShow /> */}
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
