import { useAppStore } from "@/store";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Plus, Trash } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useAppStore();

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    image: null,
    hovered: false,
    selectedColor: 0,
  });

  const saveChanges = async () => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div className="">
          <ArrowLeft className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid md:grid-cols-2 justify-center gap-5 md:gap-0">
          <div
            className="h-full w-full md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() =>
              setProfileData({ ...profileData, hovered: true })
            }
            onMouseLeave={() =>
              setProfileData({ ...profileData, hovered: false })
            }
          >
            <Avatar className="h-36 w-36 md:w-48 md:h-48 rounded-full overflow-hidden">
              {profileData.image ? (
                <AvatarImage
                  src={profileData.image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-36 w-36 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    profileData.selectedColor
                  )}`}
                >
                  {profileData.firstName
                    ? profileData.firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {profileData.hovered && (
              <div className="absolute  flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full h-36 w-36 md:h-48 md:w-48">
                {profileData.image ? (
                  <Trash className="text-gray-50/70 cursor-pointer text-3xl" />
                ) : (
                  <Camera className="text-gray-50/70 cursor-pointer text-3xl" />
                )}
              </div>
            )}
            {/* <input type="text" /> */}
          </div>
          <div className="flex flex-col min-w-64 md:min-w-64 gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={profileData?.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={profileData?.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5 items-center justify-center">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    profileData.selectedColor === index
                      ? "outline outline-slate-50/50 outline-2"
                      : ""
                  }`}
                  key={index}
                  onClick={() =>
                    setProfileData({ ...profileData, selectedColor: index })
                  }
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className={`h-14 md:h-16 w-full rounded-full transition-all duration-300 ${
              colors[profileData.selectedColor]
            } bg-slate-900/50 text-base`}
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
