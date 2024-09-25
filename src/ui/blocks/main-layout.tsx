import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/ui/blocks";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
