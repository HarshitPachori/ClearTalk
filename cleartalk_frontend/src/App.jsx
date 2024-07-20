import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/auth";
import ProfilePage from "./pages/profile";
import ChatPage from "./pages/chat";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO_ROUTE } from "./utils/constants";
import axios from "axios";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to={"/auth"} />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to={"/chat"} /> : children;
};

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth" />} />
    </>
  )
);

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE, {
          withCredentials: true,
        });
        console.log(response);
        if (response.status === 200 && response.data.user.id) {
          setUserInfo(response.data.user);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
   
    if (!userInfo && userInfo !== null) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={appRouter} />;
};

export default App;
