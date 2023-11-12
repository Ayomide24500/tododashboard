import styled from "styled-components";
import { useState, useEffect } from "react";
import { viewOneProject } from "../api/API";
import { Link } from "react-router-dom";

const Sider = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    viewOneProject().then((res: any) => {
      setState(res);
    });
  }, []);
  return (
    <Container>
      <Main>
        <Top>
          <Hold>
            <Image />
            <Content>
              <Title>Dashboard</Title>
              <TitleSub>Software Project</TitleSub>
            </Content>
          </Hold>
          <TitleSub1>You are on free plan</TitleSub1>

          <Upgrade>
            <Icon />
            <Span>Upgrade ☝️⚡</Span>
          </Upgrade>
        </Top>

        {state?.map((props: any) => (
          <Link
            key={props._id}
            to={`/project/${props._id}`}
            style={{ textDecoration: "none" }}
          >
            <ProjectTask bg="blue">ProjectTask</ProjectTask>
          </Link>
        ))}
        {/* <But>
          <Button>Add Project</Button>
        </But> */}
      </Main>
    </Container>
  );
};

export default Sider;

const Span = styled.div``;
const ProjectTask = styled.div<{ bg: string }>`
  padding: 10px 7px;
  margin-right: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  background: ${({ bg }) => bg};
`;
const Hold = styled.div`
  display: flex;
  height: 200px;
  /* background: aqua; */
  gap: 14px;
  justify-content: space-around;
  width: 100%;
`;
const Image = styled.img`
  width: 90px;
  height: 40px;
  border-radius: 5px;
  background: gray;
  margin-left: 9px;
`;
const Icon = styled.div``;
const Upgrade = styled.div`
  height: 40px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid blue;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 10px;
`;
const TitleSub1 = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 19px;
`;
const TitleSub = styled.div``;
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const Content = styled.div`
  height: 50px;
  width: 200px;
  /* background: purple; */
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  gap: 30px;
  margin-left: -5px;
  /* background: green; */
  border-bottom: 1px solid silver;
  flex-direction: column;
`;
const Main = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const Container = styled.div`
  width: 200px;
  height: calc(100vh - 70px);
  /* background: pink; */
  border-right: 1px solid silver;
  box-shadow: rgba(0, 0, 0, 0.3);
`;
