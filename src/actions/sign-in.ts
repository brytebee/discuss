"use server";

import * as auth from "@/auth";

export async function signIn(formData: FormData) {
  // provider is the value of the form where used.
  const provider = formData.get("provider") as string;
  return auth.signIn(provider);
}
