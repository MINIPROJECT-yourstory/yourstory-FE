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
      setVolunteerInfo({
        ...data,
        manager: data.manager || "-",
        content: data.content || "-",
      });
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
    {
      value: volunteerInfo.manager || "-",
      info: "-",
    },
  ];

  return (
    <>
      <BoxTitle>{volunteerInfo.title}</BoxTitle>
      <Container>
        <InfoTable>
          <GridLines>
            <div />
            <div />
            <div />
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
          <BoldText>
            {volunteerInfo.centerTitle ||
              "센터에서 홀몸 어르신의 이타적 자서전 작성을 함께할 자원봉사자를 모집합니다. "}
          </BoldText>
          <Text>
            {volunteerInfo.content ||
              "우리 센터에는 70대에서 80대의 어르신 다섯 분과 함께하고 있습니다. 울고 웃으며 여러 해를 함께해왔습니다. 센터에서의 활동을 넘어서 청년 여러분들과의 만남을 통해 힘을 얻으시는 할머님, 할아버님의 모습을 보며 올해 하반기 다시 한 번 청년 자원봉사자를 모집합니다. 처음에는 처음 뵙는 어르신과의 시간이 어색했지만, 점차 마음을 열며 여러 이야기들에 눈시울을 붉히던 이전 청년 분들이 기억납니다. 오늘 이 글과 함께 다시 한 번 어르신들의 이야기를 세상에 전할 여러분을 기다립니다. 숙멋사 팀장 드림문의사항은 아래 전화번호로 부탁드립니다. 전화번호: 0X-XXXX-XXXX"}
          </Text>
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
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;

  & > div {
    border-right: 0.7px solid #bcbf1f;
    height: 100%;
  }
`;

export default VolunteerInfo;
