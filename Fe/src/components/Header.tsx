import styled from "styled-components";
import { createNewProject } from "../api/API";
import pics from "../assets/lo.png";

const Header = () => {
  return (
    <Container>
      <Main>
        <Holder>
          <Logo src={pics} />
          <Search>
            <Icon />
            <Input placeholder="search" />
          </Search>
        </Holder>
        <Holder>
          <Button onClick={createNewProject}>create Project</Button>
          <Avatar>A</Avatar>
        </Holder>
      </Main>
    </Container>
  );
};

export default Header;
const Button = styled.div`
  padding: 10px 14px;
  background: orange;
  color: #fff;
  border-radius: 5px;
  margin: 0px 19px;
  cursor: pointer;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: darkolivegreen;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Holder = styled.div`
  display: flex;
  /* background: green; */
`;
const Logo = styled.img`
  height: 30px;
  margin-left: -70px;
  width: 120px;
  /* background: blue; */
`;
const Search = styled.div`
  border: 1px solid grey;
  border-radius: 30px;
  margin-left: 60px;
  width: 300px;
  background: White;
  align-items: center;
  padding-left: 10px;
  overflow: hidden;
`;
const Icon = styled.div`
  font-size: 30px;
`;
const Input = styled.input`
  /* flex: 1; */
  width: 100%;
  height: 100%;
  outline: none;
  background: white;
  border: none;

  &::placeholder {
    font-size: 15px;
    /* color: grey; */
  }
`;
const Main = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  /* background: grey; */
  align-items: center;
  justify-content: space-around;
`;
