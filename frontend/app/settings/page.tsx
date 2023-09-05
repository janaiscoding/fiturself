"use client";
import { useContext } from "react";
import useTokenVerification from "../hooks/useTokenVerification";
import { ModalContext } from "../context/modalContext";
import TopNav from "../components/navigation/TopNav";
import BotNav from "../components/navigation/BotNav";
import FormModal from "../components/modals/FormModal";
import Title from "../components/ui_elements/Title";
import useCurrentUser from "../hooks/useCurrentUser";
import { getJwtToken } from "../utils/api/auth/auth_handler";

const Settings = () => {
  useTokenVerification();
  const modalContext = useContext(ModalContext);
  const { currentUser, isLoadingUser } = useCurrentUser();
  const handleDelete = () => {
    fetch(`https://fittrackr.fly.dev/users/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //handle signout
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-center items-start gap-2 p-2">
        <div className="items-center justify-center">
          <Title title={"Settings. Edit profile"} />
          <form className="flex flex-col gap-2">
            <label>
              <p>First name</p>
              <input></input>
            </label>
            <label>
              <p>Last name</p>
              <input></input>
            </label>
          </form>
          <div onClick={handleDelete}>Delete account</div>
        </div>
        {modalContext.modalPost && <FormModal />}
      </div>
      <BotNav />
    </div>
  );
};
export default Settings;
