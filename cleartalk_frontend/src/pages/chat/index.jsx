import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChatPage = () => {
  const { userInfo } = useAppStore();

  const navigate = useNavigate();
  useEffect(() => {
    console.log(userInfo);
    if (!userInfo?.profileSetup) {
      toast.error("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>ChatPage</div>;
};

export default ChatPage;
