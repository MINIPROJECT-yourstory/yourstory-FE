import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import DecoratedTitle from "../../components/common/DecoratedTitle";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";

const VolunteerDetail = () => {
  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader />
        <DecoratedTitle
          frontText="봉사 신청"
          frontWeight="400"
          middleText="봉사 조회"
          middleWeight="400"
          backText="봉사 신청"
          backWeight="bold"
        />
        <ContentContainer>
          {/* 여기에 상세 내용 컴포넌트들이 들어갈 예정 */}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  padding: 81px 5%;
  margin-left: 16.5625rem;
  font-family: Inter;

  ${media.laptop} {
    margin-left: 16.5625rem;
    padding: 40px 20px;
  }

  ${media.tablet} {
    padding: 20px 10px;
    margin-left: 16.5625rem;
  }
`;

const ContentContainer = styled.div`
  background: #ffffff;
  border-radius: 17px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export default VolunteerDetail;
