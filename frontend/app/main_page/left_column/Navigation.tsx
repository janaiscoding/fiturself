import { useContext } from "react";
import { ViewContext } from "../../context/viewContext";
import Dumbbell from "../../assets/svgs/Dumbbell";
import Community from "../../assets/svgs/Community";
import HomeSVG from "../../assets/svgs/Home";
import FriendsSVG from "../../assets/svgs/Friends";
import User from "../../assets/svgs/User";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";

const NavigationList = () => {
  const viewContext = useContext(ViewContext);
  const currentUser = useContext(UserContext);

  const router = useRouter();
  const showFeed = () => {
    console.log(viewContext.current);
    viewContext.setCurrent("feed");
  };

  const showWorkouts = () => {
    viewContext.setCurrent("workouts");
  };

  const handleFriendsRedirect = () => {
    viewContext.setCurrent("friends");
    router.push(`/users/${currentUser.user?._id}`);
  };

  return (
    <div className="flex text-lg flex-col bg-blue">
      <div
        onClick={showFeed}
        className="flex gap-2 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <HomeSVG />
        <p>Feed</p>
      </div>
      <div
        onClick={showWorkouts}
        className="flex gap-2 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <Dumbbell />
        <p>Workouts</p>
      </div>
      <a
        href={`/users/${currentUser.user?._id}`}
        className="flex gap-2 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <User />
        <p>Profile</p>
      </a>
      <div
        onClick={handleFriendsRedirect}
        className="flex gap-2 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <FriendsSVG />
        <p>Friends</p>
      </div>
      <a
        href="/users"
        className="flex gap-2 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow "
      >
        <Community />
        <p>Community</p>
      </a>
    </div>
  );
};
export default NavigationList;
