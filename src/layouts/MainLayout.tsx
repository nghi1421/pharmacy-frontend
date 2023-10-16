import { FC, ReactElement, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
// import Footer from "../components/Footer";
// import Main from "../components/Main";
// import SideBar from "../components/Sidebar";
// import Header from "../components/Header";
// import Content from "../components/Content";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): ReactElement => {

  return (
    <Box
      sx={{
          display: "flex",
          maxHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
      }}
      >
          This is layout
      {/* <CssBaseline />
        <SideBar />
        <Main >
          <Header />
          <Content>
            {children}
          </Content>
          <Footer />
        </Main> */}
    </Box>
  );
};

export default Layout;