import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { volunteerApi } from "../../apis/volunteerApi";

const VolunteerStatus = () => {
  const [statusList, setStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyStatus();
  }, []);

  const fetchMyStatus = async () => {
    try {
      setIsLoading(true);
      const data = await volunteerApi.getMyStatus();
      setStatusList(data);
    } catch (error) {
      setError("봉사 현황을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="status" />
        <DecoratedTitle
          frontText="봉사 현황"
          frontWeight="400"
          middleText="나의 봉사"
          middleWeight="400"
          backText="현황"
          backWeight="bold"
        />
        <ContentContainer>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : statusList.length === 0 ? (
            <NoDataMessage>진행 중인 봉사활동이 없습니다.</NoDataMessage>
          ) : (
            <>
              {statusList.map((status) => (
                <StatusCard key={status.id}>
                  <StatusInfo>
                    <Title>{status.title}</Title>
                    <InfoRow>
                      <Label>봉사 기간:</Label>
                      <Value>{status.period}개월</Value>
                    </InfoRow>
                    <InfoRow>
                      <Label>봉사 장소:</Label>
                      <Value>{status.place}</Value>
                    </InfoRow>
                    <InfoRow>
                      <Label>봉사 요일:</Label>
                      <Value>{status.day}</Value>
                    </InfoRow>
                  </StatusInfo>
                  <ButtonContainer>
                    <WriteButton
                      onClick={() => navigate(`/work/record/${status.id}`)}
                    >
                      자서전 작성하기
                    </WriteButton>
                  </ButtonContainer>
                </StatusCard>
              ))}
            </>
          )}
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

const DecoratedTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${(props) => props.frontWeight};
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.primary};

  &::before,
  &::after {
    content: "${(props) => props.frontText}";
    font-size: 1.5rem;
    font-weight: ${(props) => props.frontWeight};
    color: ${(props) => props.theme.colors.secondary};
  }

  &::after {
    content: "${(props) => props.backText}";
    font-weight: ${(props) => props.backWeight};
  }
`;

const ContentContainer = styled.div`
  background: #ffffff;
  border-radius: 17px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StatusCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusInfo = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;

const NoDataMessage = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
`;

export default VolunteerStatus;
