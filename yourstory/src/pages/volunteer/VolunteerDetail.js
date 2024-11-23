import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import DecoratedTitle from "../../components/common/DecoratedTitle";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";
import VolunteerInfo from "../../components/volunteer/VolunteerInfo";
import { useParams } from "react-router-dom";

const VolunteerDetail = () => {
  const { id } = useParams();

  console.log("현재 봉사 ID:", id);

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="apply" />
        <DecoratedTitle
          frontText="봉사 신청"
          frontWeight="400"
          middleText="봉사 조회"
          middleWeight="400"
          backText="봉사 신청"
          backWeight="bold"
        />
        <ContentContainer>
          <VolunteerInfo workId={id} />
        </ContentContainer>
        <ApplyButtonContainer>
          <ApplyButton>신청하기</ApplyButton>
        </ApplyButtonContainer>
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
`;

const ApplyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 54.21px;
`;

const ApplyButton = styled.button`
  width: 226px;
  height: 67.39px;
  background-color: #ced118;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export default VolunteerDetail;
