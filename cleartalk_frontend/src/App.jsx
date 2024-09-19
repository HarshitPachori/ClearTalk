import React from "react";
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

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
