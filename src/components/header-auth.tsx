"use client";

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import Link from "next/link";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut}>
            <Button type="submit" color="danger" className=" shadow-sm">
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <Link href="/api/auth/signin">
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/api/auth/register">
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
