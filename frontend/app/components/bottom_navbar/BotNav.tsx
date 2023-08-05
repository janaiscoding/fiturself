"use client";

import { ModalProps } from "@/app/__types__/reactTypes";
import { removeJwtToken } from "@/app/api/auth/auth_handler";
import Community from "@/app/assets/svgs/Community";
import Dumbbell from "@/app/assets/svgs/Dumbbell";
import Plus from "@/app/assets/svgs/Plus";
import SignOut from "@/app/assets/svgs/SignOut";
import User from "@/app/assets/svgs/User";
import { ModalContext } from "@/app/context/modalContext";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const BotNav = () => {
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };
  const handleModal = () => {
    modalContext.setModal(!modalContext.modal);
  };

  return (
    <div className="sticky bottom-0 flex justify-between items-center px-8 py-2 bg-blue border-solid border-t border-yellow2 md:hidden">
      <a
        href={`/users/${userContext.user?._id}`}
        className="flex flex-col gap-1 items-center"
      >
        <User />
        {/* <p className="text-xs text-white2">Profile</p> */}
      </a>
      <a href={`/workouts`} className="flex flex-col gap-1 items-center">
        <Dumbbell />
        {/* <p className="text-xs text-white2">Workouts</p> */}
      </a>

      <button
        className="gap-1 items-center relative scale-150 -translate-y-1/2"
        onClick={handleModal}
      >
        <Plus />
        {/* <p className="text-xs text-white2">New Post</p> */}
        {/* gotta fix svg background here */}
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
