import { User } from "../../../utils/types";
import Loader from "../../../utils/assets/Loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SidebarAvatar from "../../images/SidebarAvatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import LoaderPost from "../../ui_elements/LoaderPost";
import LoaderUser from "../../ui_elements/LoaderUser";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  const userContext = useContext(UserContext);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (userContext.user) {
      setIsDemo(userContext.user._id === process.env.NEXT_PUBLIC_DEMO_ID);
    }
  }, [userContext]);

  return (
    <div className="hidden sticky md:block top-20 w-1/2">
      <div
        className={`${
          isLoadingUser && "self-center flex items-center justify-center"
        }`}
      >
        {isLoadingUser ? (
          <LoaderUser />
        ) : (
          <UserPreview currentUser={currentUser} />
        )}
      </div>

      <div className="text-xl font-ubuntu-500 self-start text-accent dark:text-gray-300 mt-10">
        Navigation
      </div>
      <NavigationList isDemo={isDemo} />
    </div>
  );
};

export default Sidebar;
//@ts-ignore

const UserPreview = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="bg-bgContainers dark:bg-gray-800 shadow-md">
      <div className="bg-secondary/10 dark:bg-zinc-950/20 flex items-center flex-col gap-1 basis-full p-2">
        <SidebarAvatar avatar={currentUser.avatar} userID={currentUser._id} />
        <a
          href={`/users/${currentUser._id}`}
          className="text-secondary dark:text-white font-ubuntu-500 text-xl text-center hover:text-accent dark:hover:text-accent"
        >
          {currentUser.first_name} {currentUser.last_name}
        </a>
      </div>
      <p className="text-secondary dark:text-gray-300 text-sm text-center p-4">
        {currentUser.bio}
      </p>
    </div>
  );
};
