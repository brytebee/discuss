"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function CreatePostForm() {
  const [formState, action] = useFormState(actions.createPost, {});
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button color="primary">Create a Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg text-center">Create a Post</h3>
              <Input
                name="title"
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                isInvalid={!!formState.errors?.title}
                errorMessage={formState.errors?.title?.join(", ")}
              />
              <Textarea
                name="content"
                label="Content"
                labelPlacement="outside"
                placeholder="Add your content"
                isInvalid={!!formState.errors?.content}
                errorMessage={formState.errors?.content?.join(", ")}
              />
              {formState.errors?._form ? (
                <div className="border-[1px] bg-red-200 p-3 rounded-md text-center">
                  {formState.errors._form?.join(", ")}
                </div>
              ) : null}
              <FormButton>Submit</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
