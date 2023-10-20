"use client";

import { removeJwtToken } from "@/app/utils/api/auth/auth_handler";
import Community from "@/app/utils/assets/svgs/Community";
import Dumbbell from "@/app/utils/assets/svgs/Dumbbell";
import HomeSVG from "@/app/utils/assets/svgs/Home";
import Plus from "@/app/utils/assets/svgs/Plus";
import SignOut from "@/app/utils/assets/svgs/SignOut";
import { ModalContext } from "@/app/context/modalContext";
import { UserContext } from "@/app/context/userContext";
import { ViewContext } from "@/app/context/viewContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import User from "@/app/utils/assets/svgs/User";

const BotNav = () => {
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const router = useRouter();
  const path = usePathname();

  const showFeed = () => {
    if (path !== "/") {
      router.push("/");
    }
    window.scrollTo(0, 0);
  };

  const showProfile = () => {
    if (path !== `/users/${userContext.user?._id}`) {
      router.push(`/users/${userContext.user?._id}`);
    }
    window.scrollTo(0, 0);
  };
  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };
  const handleModal = () => {
    modalContext.setModalPost(!modalContext.modalPost);
  };

  return (
    <div className="sticky bottom-0 flex justify-between items-center px-8 py-2 bg-bgContainers shadow-md md:hidden">
      <div onClick={showFeed} className="flex flex-col gap-1 items-center">
        <HomeSVG />
      </div>
      <div onClick={showProfile} className="flex flex-col gap-1 items-center">
        <User />
        {/* <p className="text-xs text-white2">Workouts</p> */}
      </div>

      <button
        className="gap-1 items-center relative scale-150 -translate-y-1/2"
        onClick={handleModal}
      >
        <Plus />
        {/* <p className="text-xs text-white2">New Post</p> */}
        {/* gotta fix svg background here --- fixed.*/}
      </button>
      <a href={`/users`} className="flex flex-col gap-1 items-center">
        <Community />
        {/* <p className="text-xs text-white2">Community</p> */}
      </a>
      <div
        className="flex flex-col gap-1 items-center hover:cursor-pointer"
        onClick={handleSignout}
      >
        <SignOut />
        {/* <p className="text-xs text-white2">Sign Out</p> */}
      </div>
    </div>
  );
};

export default BotNav;
