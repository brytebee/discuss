import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

const { signInGit, signInGoog, signOut } = actions;

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={signInGit}>
        <Button type="submit">GitHub Sign In</Button>
      </form>

      <form action={signInGoog}>
        <Button type="submit">Google Sign In</Button>
      </form>

      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed out!</div>
      )}

      <Profile />
    </div>
  );
}
