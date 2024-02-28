"use client";

import * as actions from "@/actions";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

export default function VerifyCode() {
  const [formState, action] = useFormState(actions.verifyCode, {});
  return (
    <form action={action}>
      <div className="flex flex-col gap-4 p-4 w-80">
        <h1>Verify Account</h1>
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
          name="code"
          label="Code"
          type="text"
          maxLength={6}
          labelPlacement="outside"
          placeholder="6 digit code"
          isInvalid={!!formState.errors?.code}
          errorMessage={formState.errors?.code?.join(", ")}
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
