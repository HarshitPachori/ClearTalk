import React, { useState } from "react";
import { Tv } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import victoryIcon from "@/assets/victory.svg";
import loginImg from "@/assets/login2.png";

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

  const handleLogin = () => {};
  const handleSignup = () => {};
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <div className="h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] bg-white border-2 border-white shadow-2xl rounded-3xl grid xl:grid-cols-2 text-opacity-90">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* welcome msg */}
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victoryIcon} className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with best chat app!
            </p>
          </div>
          {/* login / signup   tabs */}
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
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
