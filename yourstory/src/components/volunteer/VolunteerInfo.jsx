import React from "react";
import styled from "styled-components";

const VolunteerInfo = () => {
  const volunteerInfo = [
    {
      label: "봉사 기간",
      value: "6개월",
      description: "모집 기관",
      info: "하늘꿈센터",
    },
    {
      label: "봉사 장소",
      value: "하늘꿈센터",
      description: "모집 인원",
      info: "3명",
    },
    {
      label: "봉사 요일",
      value: "매주\n월/수/금 중 택1",
      description: "담당자",
      info: "숙멋사 팀장",
    },
    {
      label: "봉사 시간",
      value: "15시 0분~17시 0분",
      description: "기타사항",
      info: "식수 제공",
    },
  ];

  return (
    <>
      <BoxTitle>하늘꿈센터</BoxTitle>
      <Container>
        <InfoTable>
          {volunteerInfo.map((info, index) => (
            <Row key={index}>
              <Label>{info.label}</Label>
              <Value>{info.value}</Value>
              <Description>{info.description}</Description>
              <Info>{info.info}</Info>
            </Row>
          ))}
        </InfoTable>

        <ContentBox>
          <Text>
            하늘꿈센터에서 홀몸 어르신의 이타적 자서전 작성을 함께할
            자원봉사자를 모집합니다.
          </Text>
          <Text>
            우리 센터에는 70대에서 80대의 어르신 다섯 분과 함께하고 있습니다.
            울고 웃으며 여러 해를 함께해왔습니다. 센터에서의 활동을 넘어서 청년
            여러분들과의 만남을 통해 힘을 얻으시는 할머님, 할아버님의 모습을
            보며 올해 하반기 다시 한 번 청년 자원봉사자를 모집합니다.
          </Text>
          <Text>
            오늘 이 글과 함께 다시 한 번 어르신들의 이야기를 세상에 전할
            여러분을 기다립니다.
          </Text>

          <Signature>숙멋사 팀장 드림</Signature>
          <Contact>
            문의사항은 아래 전화번호로 부탁드립니다.
            <PhoneNumber>전화번호: 0X-XXXX-XXXX</PhoneNumber>
          </Contact>
        </ContentBox>
      </Container>
    </>
  );
};

const BoxTitle = styled.div`
  font-size: 24px;
  letter-spacing: -1% !important;
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
  padding: 2rem;
  border-radius: 0 0 10px 10px;
`;

const InfoTable = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-bottom: 2rem;
  background-color: #f3f3f3;
  padding: 1.5rem;
  border-radius: 8px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px 100px;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const Label = styled.div`
  font-weight: 500;
  color: #333;
`;

const Value = styled.span`
  color: #333;
  white-space: pre-line;
`;

const Description = styled.span`
  color: #666;
`;

const Info = styled.span`
  color: #333;
  text-align: right;
`;

const ContentBox = styled.div`
  background-color: #f3f3f3;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const Text = styled.p`
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Signature = styled.p`
  margin-top: 2rem;
  font-weight: 500;
`;

const Contact = styled.div`
  margin-top: 0.5rem;
  color: #666;
`;

const PhoneNumber = styled.div`
  margin-top: 0.5rem;
`;

export default VolunteerInfo;
