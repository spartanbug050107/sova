import React from "react";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

import useAuthUser from "./hooks/useAuthUser.js";

import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isSetupDone = authUser?.hasCompletedSetup;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isSetupDone ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/setup"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isSetupDone ? "/" : "/setup"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isSetupDone ? "/" : "/setup"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isSetupDone ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/setup"} />
            )
          }
        />

        <Route
          path="/setup"
          element={
            isAuthenticated ? (
              !isSetupDone ? (
                <SetupPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isSetupDone ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/setup"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isSetupDone ? (
              <ChatPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/setup"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
