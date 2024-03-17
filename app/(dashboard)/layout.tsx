"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetUserByEmail } from "@/core/hooks/users";
import nProgress from "@/lib/nprogress";
import Loader from "@/components/ui/loader";
import { useGetProjectsByUserEmail } from "@/core/hooks/projects";
import { useAuth } from "@/core/providers/authProvider";
import Header from "@/components/layout/header";
import { Toaster } from "sonner";
import { UserNav } from "@/components/ui/userNav";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  const { user, setUser } = useAuth();

  const { mutateAsync } = useGetUserByEmail();

  const projects = useGetProjectsByUserEmail();

  const getUser = async (email: string) => {
    const user = await mutateAsync(email);
    if (user) {
      setUser(user);
    } else {
      nProgress.start();
      router.push("/login");
    }
  };

  const getProjects = async (email: string) => {
    const projectsList = await projects.mutateAsync(email);

    if (projectsList?.length > 0) {
      return;
    } else {
      return router.push("/create-project");
    }
  };

  useEffect(() => {
    if (!user?.id) {
      console.log("TRIGGGGGGGER!!!!!!!!");
      nProgress.start();
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      getUser(user.email);
      getProjects(user.email);
    }
  }, []);

  return (
    <>
      {!user?.email && <Loader />}
      {user?.email && path !== "/create-project" && (
        <>
          <Header />
          <main className="flex flex-col pt-36 pb-24 hd-screen w-full px-4 lg:px-32 xl:px-44 2xl:px-80">
            {children}
          </main>
          <Toaster theme="dark" />
        </>
      )}
      {user?.email && path === "/create-project" && (
        <>
          <div className="fixed top-0 flex flex-col w-full h-fit pt-4 border-b border-zinc-700/50 bg-zinc-900/50 backdrop:blur-xl">
            <header className="flex items-center justify-between h-14 w-full px-4 lg:px-32 xl:px-44 2xl:px-80 pb-4">
              <div className="flex items-center space-x-4 w-full h-14">
                <h1 className="font-bold text-2xl">Create new Store</h1>
              </div>
              <div className="flex items-center space-x-4 w-full h-14 justify-end">
                <UserNav />
              </div>
            </header>
          </div>
          <main className="flex flex-col justify-center hd-screen w-full px-4 lg:px-32 xl:px-44 2xl:px-80">
            {children}
          </main>
        </>
      )}
    </>
  );
}
