import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/context/ThemeContext";
import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { BASE_URL, LOGOUT_ROUTE } from "@/utils/constants";
import axios from "axios";
import { Pencil, Power, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState(theme);

  const chatThemeColor = [
    {
      color: "text-red-200 bg-red-400",
      senderMessageColor: "text-red-200 bg-red-400",
      recieverMessageColor: "text-yellow-200 bg-yellow-400",
      btnColor: "text-red-200 bg-red-500",
      gradientFrom: "red-400",
      gradientTo: "yellow-400",
    },
    {
      color: "text-yellow-200 bg-yellow-400",
      senderMessageColor: "text-yellow-200 bg-yellow-400",
      recieverMessageColor: "text-green-200 bg-green-400",
      btnColor: "text-yellow-200 bg-yellow-500",
      gradientFrom: "yellow-400",
      gradientTo: "green-400",
    },
    {
      color: "text-green-200 bg-green-400",
      senderMessageColor: "text-green-200 bg-green-400",
      recieverMessageColor: "text-blue-200 bg-blue-400",
      btnColor: "text-green-200 bg-green-500",
      gradientFrom: "green-400",
      gradientTo: "blue-400",
    },
    {
      color: "text-blue-200 bg-blue-400",
      senderMessageColor: "text-blue-200 bg-blue-400",
      recieverMessageColor: "text-pink-200 bg-pink-400",
      btnColor: "text-blue-200 bg-blue-500",
      gradientFrom: "blue-400",
      gradientTo: "pink-400",
    },
  ];

  const logoutHandler = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserInfo(null);
        toast.success(response.data);
        navigate("/auth");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);
  return (
    <div className="absolute bottom-0 h-16 md:h-[90px] flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 relative ">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${BASE_URL}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Pencil
                className="text-purple-500 "
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Settings
                className="text-yellow-500 "
                onClick={() => setOpenSettingsModal(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Power className="text-red-500 " onClick={logoutHandler} />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Dialog open={openSettingsModal} onOpenChange={setOpenSettingsModal}>
        <DialogContent className="bg-[#181920] border-none rounded-lg text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-neutral-200">
              Profile Settings
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-2 my-2">
            <h1>Choose Chat Theme</h1>
            <div className="flex gap-10 ">
              <div
                className={`h-10 w-10 rounded-full bg-color-theme1 cursor-pointer ${
                  activeTheme === "theme1" &&
                  "border-2 border-fuchsia-400 drop-shadow-lg"
                }`}
                onClick={() => toggleTheme("theme1")}
              />
              <div
                className={`h-10 w-10 rounded-full bg-color-theme2 cursor-pointer ${
                  activeTheme === "theme2" &&
                  "border-2 border-fuchsia-400 drop-shadow-lg"
                }`}
                onClick={() => toggleTheme("theme2")}
              />
              <div
                className={`h-10 w-10 rounded-full bg-color-theme3 cursor-pointer ${
                  activeTheme === "theme3" &&
                  "border-2 border-fuchsia-400 drop-shadow-lg"
                }`}
                onClick={() => toggleTheme("theme3")}
              />
              <div
                className={`h-10 w-10 rounded-full bg-color-theme4 cursor-pointer ${
                  activeTheme === "theme4" &&
                  "border-2 border-fuchsia-400 drop-shadow-lg"
                }`}
                onClick={() => toggleTheme("theme4")}
              />
            </div>
          </div>
          <div className="text-center">Now chat look's like below</div>
          <div className="border rounded-md px-2 py-5 flex flex-col gap-2">
            <div className="relative text-left">
              <div
                className={`bg-color-${theme} bg-color-${theme}-hover border-color-${theme} text-color-${theme}  max-w-[70%] inline-block my-1 p-2 border-2 rounded-md z-10`}
              >
                Hi, I'm Reciever
              </div>
              <div
                className={`absolute  top-1 -left-1 h-3 w-2 bg-color-${theme} rounded-tr-sn rounded-bl-full border-l-2 border-t-2 border-color-${theme}`}
              ></div>
            </div>
            <div className="relative text-right">
              <div
                className={`bg-color-${theme} bg-color-${theme}-hover  max-w-[70%] inline-block text-color-${theme}  my-1 p-2 border-2 border-color-${theme} rounded-md`}
              >
                Hi, I'm Sender
              </div>
              <div
                className={`absolute  top-1 -right-1 h-3 w-2 bg-color-${theme} rounded-tl-sn rounded-br-full border-r-2 border-t-2 border-color-${theme}`}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInfo;
