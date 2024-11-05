"use client";

import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Header />
      <div className="px-5 mt-5">
        <p className="text-2xl">{user?.emailAddresses[0].emailAddress}</p>
        <p className="text-2xl">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-2xl">{user?.id}</p>
        <p className="text-2xl">{user?.username}</p>
      </div>
    </>
  );
}
