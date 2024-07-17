import { useAppStore } from "@/store";
import React from "react";

const ProfilePage = () => {
  const { userInfo } = useAppStore();
  return (
    <div>
      ProfilePage
      <div>Email : {userInfo?.email}</div>
    </div>
  );
};

export default ProfilePage;
