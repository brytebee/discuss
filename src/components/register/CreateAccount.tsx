"use client";

import * as actions from "@/actions";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

export default function CreateAccountPage() {
  const [formState, action] = useFormState(actions.createAccount, {});
  return (
    <form action={action}>
      <div className="flex flex-col gap-4 p-4 w-80">
        <h1>Create Account</h1>
        <Input
          name="name"
          label="Name"
          type="text"
          labelPlacement="outside"
          placeholder="Jane Doe"
          isInvalid={!!formState.errors?.name}
          errorMessage={formState.errors?.name?.join(", ")}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          labelPlacement="outside"
          placeholder="janedoe@email.com"
          isInvalid={!!formState.errors?.email}
          errorMessage={formState.errors?.email?.join(", ")}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          labelPlacement="outside"
          placeholder="********"
          isInvalid={!!formState.errors?.password}
          errorMessage={formState.errors?.password?.join(", ")}
        />
        {formState.errors?._form ? (
          <div className="rounded border-[1px] bg-red-200">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <FormButton>Register</FormButton>
      </div>
    </form>
  );
}
