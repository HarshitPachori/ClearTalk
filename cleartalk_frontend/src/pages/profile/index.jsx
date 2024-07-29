import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Trash } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BASE_URL,
  DELETE_USER_PROFILE_PIC_ROUTE,
  UPDATE_USER_INFO_ROUTE,
  UPDATE_USER_PROFILE_PIC_ROUTE,
} from "@/utils/constants";
import axios from "axios";
import { apiClient } from "@/lib/api-client";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    image: null,
    hovered: false,
    selectedColor: 0,
  });

  const validateProfile = () => {
    if (!profileData.firstName.length) {
      toast.error("FirstName is required.");
      return false;
    }
    if (!profileData.lastName.length) {
      toast.error("LastName is required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.put(
          UPDATE_USER_INFO_ROUTE,
          {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            color: profileData.selectedColor,
          },
          { withCredentials: true } // for storing jwt cookie
        );
        if (response.status === 200 && response.data.user.id) {
          setUserInfo(response.data.user);
          toast.success("Profile updated successfully.");
          navigate("/chat");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      }
    }
  };

  const handleNavigateBackBtn = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile first.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("profile-image", file);
        const response = await apiClient.put(
          UPDATE_USER_PROFILE_PIC_ROUTE,
          formData,
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.image) {
          setUserInfo({ ...userInfo, image: response.data.image });
          toast.success("Profile pic updated successfully.");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data);
      }
    }
  };

  const handleImageDelete = async () => {
    try {
      const response = await apiClient.delete(
        DELETE_USER_PROFILE_PIC_ROUTE,
        { withCredentials: true } // for storing jwt cookie
      );
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success(response.data);
        setProfileData({ ...profileData, image: null });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (userInfo.profileSetup) {
      setProfileData({
        ...profileData,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        selectedColor: userInfo.color,
        image: userInfo.image ? `${BASE_URL}/${userInfo.image}` : null,
      });
    }
  }, [userInfo]);

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max  shadow-md rounded-2xl shadow-slate-950 bg-black/50 px-5 md:px-10 py-8 md:py-10 ">
        <div className="">
          <ArrowLeft
            className="text-4xl lg:text-6xl text-white/70 cursor-pointer"
            onClick={handleNavigateBackBtn}
          />
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
              <div
                className="absolute  flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full h-36 w-36 md:h-48 md:w-48"
                onClick={
                  profileData.image ? handleImageDelete : handleFileInputClick
                }
              >
                {profileData.image ? (
                  <Trash className="text-gray-50/70 cursor-pointer text-3xl" />
                ) : (
                  <Camera className="text-gray-50/70 cursor-pointer text-3xl" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              name="profile-image"
              accept=".jpeg, .png, .svg, .jpg, .webp"
            />
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
