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
          };
        })
      );
      setStatusList(detailedList);
    } catch (error) {
      console.error("봉사 현황 조회 실패:", error);
    }
  };

  const handleDetailClick = (workId) => {
    navigate(`/work/${workId}`);
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="status" />
        <ListContainer>
          {statusList.length === 0 ? (
            <EmptyStateContainer>
              <EmptyStateMessage>신청한 봉사활동이 없습니다.</EmptyStateMessage>
            </EmptyStateContainer>
          ) : (
            statusList.map((volunteer) => (
              <CardContainer key={volunteer.id}>
                <CardHeader>
                  <HeaderLeft>
                    <CardTitle>
                      <CenterName>{volunteer.title}</CenterName>
                      <StatusBadge status={volunteer.state}>
                        {volunteer.state}
                      </StatusBadge>
                    </CardTitle>
                    <InfoText>
                      <InfoLabel>[모집기간]</InfoLabel>{" "}
                      {volunteer.recruitmentStart} ~ {volunteer.recruitmentEnd}
                    </InfoText>
                    <InfoText>
                      <InfoLabel>[등록기관]</InfoLabel> {volunteer.org}
                    </InfoText>
                  </HeaderLeft>
                  <HeaderRight>
                    <InfoText>
                      <InfoLabel>[봉사기간]</InfoLabel> {volunteer.period}개월
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
              </CardContainer>
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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  border-radius: 17px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  background: transparent;
  padding: 1.125rem;
  transition: transform 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 28px;
    right: 28px;
    height: 0.7px;
    background-color: #bcbf1f;
  }

  ${media.tablet} {
    padding: 1rem;
  }
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

const StatusBadge = styled.span`
  padding: 0.25rem 2.6875rem;
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: 800;
  color: #ced118;
`;

const DetailButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background-color: #ced118;
  color: white;
  font-size: 0.875rem;
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
