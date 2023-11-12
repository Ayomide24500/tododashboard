import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Homepage from "../pages/Homepage";
import Header from "./Header";
import Sider from "./Sider";

const Layout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Holder>
          <Div>
            <Sider />
          </Div>
          <Outlet />
        </Holder>
      </Main>
    </div>
  );
};

export default Layout;
const Holder = styled.div`
  width: calc(100% - 10px);
  display: flex;
  padding-left: 10px;
`;
const Div = styled.div`
  display: flex;
  width: 200px;
`;
const Main = styled.div`
  display: flex;
`;
