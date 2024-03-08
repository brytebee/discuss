import { Comment } from "@prisma/client";
import { db } from "..";

export type CommenntsWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommenntsWithAuthor[]> {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}
