import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { volunteerApi } from "../../apis/volunteerApi";
import { media } from "../../styles/theme";
import NavBar from "../../components/common/NavBar";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";

const VolunteerStatus = () => {
  const [statusList, setStatusList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyStatus();
  }, []);

  const fetchMyStatus = async () => {
    try {
      const data = await volunteerApi.getMyStatus();
      const detailedList = await Promise.all(
        data.map(async (status) => {
          const details = await volunteerApi.getVolunteerDetail(status.workId);
          return {
            ...status,
            ...details,
            state: details.state,
          };
        })
      );
      setStatusList(detailedList);
      console.log("전체 데이터:", detailedList);
    } catch (error) {
      console.error("봉사 현황 조회 실패:", error);
    }
  };

  const handleDetailClick = (workId) => {
    navigate(`/work/${workId}`);
  };

  const handleJournalClick = (workId) => {
    navigate(`/work/record/${workId}`);
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="status" />
        <TitleContainer>
          <StateTitle>진행 중인 봉사활동</StateTitle>
          <Line />
        </TitleContainer>
        <ListContainer>
          {statusList.length === 0 ? (
            <EmptyStateContainer>
              <EmptyStateMessage>신청한 봉사활동이 없습니다.</EmptyStateMessage>
            </EmptyStateContainer>
          ) : (
            statusList.map((volunteer, index) => (
              <>
                <CardContainer key={volunteer.id}>
                  <WhiteSection>
                    <CardHeader>
                      <HeaderLeft>
                        <CardTitle>
                          <CenterName>{volunteer.title}</CenterName>
                        </CardTitle>
                        <InfoText>
                          <InfoLabel>[모집기간]</InfoLabel>{" "}
                          {volunteer.recruitmentStart} ~{" "}
                          {volunteer.recruitmentEnd}
                        </InfoText>
                        <InfoText>
                          <InfoLabel>[등록기관]</InfoLabel> {volunteer.org}
                        </InfoText>
                      </HeaderLeft>
                      <HeaderRight>
                        <InfoText>
                          <InfoLabel>[봉사기간]</InfoLabel> {volunteer.period}
                          개월
                        </InfoText>
                        <InfoContainer>
                          <InfoText>
                            <InfoLabel>[봉사요일]</InfoLabel> {volunteer.day}
                          </InfoText>
                          <DetailButton
                            onClick={() => handleDetailClick(volunteer.workId)}
                          >
                            자세히 보기
                          </DetailButton>
                        </InfoContainer>
                      </HeaderRight>
                    </CardHeader>
                  </WhiteSection>
                  <GreenSection>
                    <StoryContainer>
                      <StoryTitle>어르신의 이야기를 듣고 있어요</StoryTitle>
                      <DayCount>시작한지 {volunteer.days || 0}일째</DayCount>
                    </StoryContainer>
                    <JournalButton
                      onClick={() => handleJournalClick(volunteer.workId)}
                    >
                      자서전 기록장
                    </JournalButton>
                  </GreenSection>
                </CardContainer>
                {index < statusList.length - 1 && <DashedDivider />}
              </>
            ))
          )}
        </ListContainer>
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 17px;
  margin-top: 50px;
  margin-bottom: 60px;
  padding: 0;
`;

const StateTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #bcbf1f;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: #bcbf1f;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 17px;
`;

const CardContainer = styled.div`
  background: transparent;
  position: relative;
  transition: transform 0.2s ease;
  border-radius: 17px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
  }
`;

const WhiteSection = styled.div`
  background: #f3f3f3;
  padding: 40px 35px 60px 35px;
`;

const GreenSection = styled.div`
  background: #bcbf1f;
  padding: 43px 35px 32px 35px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoryTitle = styled.h2`
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.1em;
  color: white;
  margin: 0;
`;

const DayCount = styled.p`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.1em;
  color: white;
  margin: 0;
`;

const JournalButton = styled.button`
  width: 248px;
  height: 59px;
  background-color: #ced118;
  border: none;
  border-radius: 50px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.1em;
  cursor: pointer;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  align-self: flex-end;
`;

const DashedDivider = styled.div`
  width: 100%;
  height: 2px;
  border: none;
  background-image: linear-gradient(to right, #bcbf1f 75%, transparent 25%);
  background-size: 8px 1px;
  background-repeat: repeat-x;
  margin: 70px 0;
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CenterName = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #919400;
`;

const DetailButton = styled.button`
  padding: 10px 25px;
  width: 116px;
  height: 37px;
  border: none;
  border-radius: 50px;
  background-color: #ced118;
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.04em;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: auto;

  &:hover {
    opacity: 0.9;
  }
`;

const InfoText = styled.p`
  font-size: 1.125rem;
  color: #000000;
  font-weight: 350;
  margin: 0;
  line-height: 1.5;
`;

const InfoLabel = styled.span`
  color: #333;
  font-weight: 500;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

const EmptyStateMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

export default VolunteerStatus;
