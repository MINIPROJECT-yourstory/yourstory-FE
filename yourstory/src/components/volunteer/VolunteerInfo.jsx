import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { volunteerApi } from "../../apis/volunteerApi";
import LoadingSpinner from "../common/LoadingSpinner";

const LABELS = {
  firstRow: ["봉사 기간", "봉사 장소", "봉사 요일", "봉사 시간"],
  secondRow: ["모집 기관", "모집 인원", "담당자", "기타사항"],
};

const VolunteerInfo = ({ workId }) => {
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workId) {
      setError("유효하지 않은 봉사 ID입니다.");
      setIsLoading(false);
      return;
    }
    fetchVolunteerDetail();
  }, [workId]);

  const fetchVolunteerDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await volunteerApi.getVolunteerDetail(workId);
      setVolunteerInfo(data);
    } catch (error) {
      console.error("봉사 상세 정보 조회 실패:", error);
      setError(
        error.response?.data?.message || "봉사 정보를 불러오는데 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!volunteerInfo) return <div>정보를 불러올 수 없습니다.</div>;

  const infoData = [
    {
      value: `${volunteerInfo.period}개월`,
      info: volunteerInfo.org,
    },
    {
      value: volunteerInfo.place,
      info: `${volunteerInfo.person}명`,
    },
    {
      value: volunteerInfo.day || "-",
      info: "-",
    },
    {
      value: volunteerInfo.time || "-",
      info: "-",
    },
  ];

  return (
    <>
      <BoxTitle>{volunteerInfo.title}</BoxTitle>
      <Container>
        <InfoTable>
          <GridLines>
            <span />
          </GridLines>
          {infoData.map((info, index) => (
            <Row key={index}>
              <StyledLabel>{LABELS.firstRow[index]}</StyledLabel>
              <ContentText>{info.value}</ContentText>
              <StyledLabel>{LABELS.secondRow[index]}</StyledLabel>
              <ContentText>{info.info}</ContentText>
            </Row>
          ))}
        </InfoTable>

        <ContentBox>
          <BoldText>{volunteerInfo.centerTitle || "-"}</BoldText>
          <Text>{volunteerInfo.centerContent || "-"}</Text>
        </ContentBox>
      </Container>
    </>
  );
};

const BoxTitle = styled.div`
  font-size: 24px;
  letter-spacing: -0.01em !important;
  font-weight: 800;
  color: white;
  background-color: #bcbf1f;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  margin: 0;
  text-align: center;
`;

const Container = styled.div`
  background-color: #f3f3f3;
  padding: 60px 2rem 84px 2rem;
  border-radius: 0 0 10px 10px;
`;

const InfoTable = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1rem;
  margin-bottom: 2rem;
  background-color: #f3f3f3;
  border-radius: 8px;
  padding-bottom: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const ContentText = styled.span`
  color: #000000;
  white-space: pre-line;
  text-align: left;
  margin-left: 20px;
  font-size: 18px;

  &:nth-of-type(2) {
    margin-left: 30px;
  }
`;

const ContentBox = styled.div`
  background-color: #f3f3f3;
  padding: 1.2rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const BoldText = styled.div`
  font-weight: 700;
  color: #333;
`;

const Text = styled.p`
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Contact = styled.div`
  margin-top: 0.5rem;
  color: #666;
`;

const PhoneNumber = styled.div`
  margin-top: 0.5rem;
`;

const StyledLabel = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #bcbf1f;
  text-align: center;
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before,
  &::after,
  & span {
    content: "";
    position: absolute;
    top: 0;
    width: 0.7px;
    height: 100%;
    background-color: #bcbf1f;
  }

  &::before {
    left: 25%;
  }

  &::after {
    left: 50%;
  }

  & span {
    left: 75%;
  }
`;

export default VolunteerInfo;
