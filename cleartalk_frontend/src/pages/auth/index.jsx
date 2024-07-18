import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import victoryIcon from "@/assets/victory.svg";
import loginImg from "@/assets/login2.png";
import { toast } from "sonner";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const AuthPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();

  const validateSignup = () => {
    if (!signupData.email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!signupData.password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (
      !signupData.confirmPassword.length ||
      signupData.confirmPassword !== signupData.password
    ) {
      toast.error("Confirm Password and Password must be same.");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!loginData.email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!loginData.password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        console.log(loginData);
        const response = await apiClient.post(
          LOGIN_ROUTE,
          {
            email: loginData.email,
            password: loginData.password,
          },
          { withCredentials: true } // for storing jwt cookie
        );
        console.log({ response });
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          toast.success("Login successfully.");
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
        console.log({ response });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        console.log(signupData);
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email: signupData.email,
            password: signupData.password,
          },
          { withCredentials: true } // for storing jwt cookie
        );

        if (response.status === 201) {
          setUserInfo(response.data.user);
          toast.success("Registered successfully.");
          navigate("/profile");
        }
        console.log({ response });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <div className="h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] bg-white border-2 border-white shadow-2xl rounded-3xl grid xl:grid-cols-2 text-opacity-90">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* welcome msg */}
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-4xl sm:text-5xl font-bold md:text-6xl">
                Welcome
              </h1>
              <img
                src={victoryIcon}
                className="h-[70px] sm:h-[100px] w-[70px] sm:w-[100px]"
              />
            </div>
            <p className="text-sm sm:text-base font-medium text-center px-5">
              Fill in the details to get started with best chat app!
            </p>
          </div>
          {/* login / signup   tabs */}
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent w-full rounded-none">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                <Input
                  placeholder="Email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="p-6 rounded-full"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="p-6 rounded-full"
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="p-6 rounded-full"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className="p-6 rounded-full"
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="p-6 rounded-full"
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center h-[700px]">
          <img src={loginImg} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
