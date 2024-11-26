import NavBar from "../components/common/NavBar";
import HomeIntro from "../components/common/HomeIntro";
import HomeImg from "../assets/images/img-home.png";
import styled from "styled-components";
import VisionImg from "../assets/images/img-vision.svg";

function Home() {
  return (
    <div>
      <Wrapper>
        <NavBar />
        <ContentWrapper>
          <WelcomeImg src={HomeImg} />
          <IntroWrapper>
            <HomeIntro />
            <VisionWrapper>
              <Vision src={VisionImg} alt="비전 이미지" />
              <Description>
                우리는 나눕니다
                <br />
                평범한 사람의 소중한 기억을
                <br />
                <br /> 우리는 듣습니다 <br /> 세월이 흘러도, 시간이 지나도
                <br /> <br />
                우리는 함께합니다.
                <br /> 당신의 추억이 우리와 살아 숨쉴 수 있도록
              </Description>
            </VisionWrapper>
          </IntroWrapper>
        </ContentWrapper>
      </Wrapper>
    </div>
  );
}

export default Home;
const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 16.5625rem;
  height: 100vh;
`;
const ContentWrapper = styled.div``;

const WelcomeImg = styled.img`
  width: 100%;
`;

const IntroWrapper = styled.div`
  padding: 10.5625rem 4.75rem;
`;

const VisionWrapper = styled.div`
  margin-top: 6.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

const Vision = styled.img`
  width: 304px;
  height: 276px;
`;

const Description = styled.div`
  font-family: Inter;
  font-size: 23px;
  font-weight: 350;
  line-height: 27.84px;
  letter-spacing: -0.06em;
  text-align: left;
  color: var(--green);
`;
