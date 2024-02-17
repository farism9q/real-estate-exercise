import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";
import MobileNavigation from "./MobileSidebar";

import ToastProvider from "../components/providers/ToastProvider";
import ModalsProvider from "../components/providers/ModalsProvider";

export default function AppLayout() {
  return (
    <>
      <ToastProvider />
      <ModalsProvider />
      <div className="min-h-screen dark:bg-gray-800/70">
        <Navigation />
        <MobileNavigation />

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
