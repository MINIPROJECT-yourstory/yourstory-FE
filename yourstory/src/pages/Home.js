import NavBar from "../components/common/NavBar";
import HomeImg from "../assets/images/img-home.svg";
import styled from "styled-components";

function Home() {
  return (
    <div>
      <Wrapper>
        <NavBar />
        <ContentWrapper>
          <WelcomeImg src={HomeImg} />
        </ContentWrapper>
      </Wrapper>
    </div>
  );
}

export default Home;
const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 265px;
  height: 100vh;
`;
const ContentWrapper = styled.div``;

const WelcomeImg = styled.img`
  width: 100%;
`;
