"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  return (
    <div>
      {session.data?.user ? (
        <div>From Client: {JSON.stringify(session.data.user)}</div>
      ) : (
        <div>From Client: Signed out!</div>
      )}
    </div>
  );
}
