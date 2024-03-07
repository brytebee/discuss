import CreatePostForm from "@/components/post/create-post-form";
import PostList from "@/components/post/post-list";
import { fetchPostWithTopicSlug } from "@/db/queries/post";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function TopicShow({ params: { slug } }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostWithTopicSlug(slug)} />
      </div>
      <div>
        <CreatePostForm slug={slug} />
      </div>
    </div>
  );
}
