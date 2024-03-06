"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { z } from "zod";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { path } from "@/path";
import { redirect } from "next/navigation";

const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors?: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const validate = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Please log in to perform this action!"],
      },
    };
  }

  if (!session.user.id) {
    return {
      errors: {
        _form: ["The user id is missing!"],
      },
    };
  }

  const topic = await db.topic.findFirst({ where: { slug } });
  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found!"],
      },
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: validate.data.title,
        content: validate.data.content,
        topicId: topic.id,
        userId: session.user.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Unable to create post!"],
        },
      };
    }
  }

  revalidatePath(path.topicShow(slug));
  redirect(path.postShow(slug, post.id));
}
