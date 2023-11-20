import { FC } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative flex flex-col w-full min-h-screen">
        <Navbar />
        <main className="grow">{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
