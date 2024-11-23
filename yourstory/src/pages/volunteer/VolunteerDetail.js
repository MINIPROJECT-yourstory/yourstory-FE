import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import DecoratedTitle from "../../components/common/DecoratedTitle";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";
import VolunteerInfo from "../../components/volunteer/VolunteerInfo";
import { useParams, useNavigate } from "react-router-dom";
import { volunteerApi } from "../../apis/volunteerApi";

const VolunteerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleApply = async () => {
    try {
      // 토큰 존재 여부 먼저 확인
      const token = localStorage.getItem("access");
      if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        // 로그인 페이지로 리다이렉트
        navigate("/login");
        return;
      }

      await volunteerApi.applyVolunteer(id);
      alert("봉사활동이 신청되었습니다!");
      navigate("/work/my-status");
    } catch (error) {
      if (error.message.includes("토큰")) {
        alert(error.message);
        navigate("/login");
      } else {
        alert(error.message || "봉사 신청에 실패했습니다.");
      }
    }
  };

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
          <ApplyButton onClick={handleApply}>신청하기</ApplyButton>
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
