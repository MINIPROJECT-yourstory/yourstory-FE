import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";
import { useNavigate, useLocation } from "react-router-dom";
import { volunteerApi } from "../../apis/volunteerApi";

const VolunteerDiary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workId = location.state?.workId;

  const [diaryData, setDiaryData] = useState({
    conditionId: workId,
    date: new Date().toISOString().split("T")[0],
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordData = {
        conditionId: workId,
        date: diaryData.date,
        content: diaryData.content,
      };

      await volunteerApi.createRecord(recordData);
      alert("자서전이 성공적으로 저장되었습니다!");
      navigate("/work/my-status");
    } catch (error) {
      console.error("자서전 작성 중 오류:", error);
      alert("자서전 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="status" />
        <ContentContainer>
          <Title>자서전 기록장</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>날짜</Label>
              <Input
                type="date"
                name="date"
                value={diaryData.date}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>내용</Label>
              <TextArea
                name="content"
                value={diaryData.content}
                onChange={handleChange}
                placeholder="오늘의 봉사활동을 기록해주세요."
                required
              />
            </FormGroup>
            <ButtonContainer>
              <SubmitButton type="submit">저장하기</SubmitButton>
            </ButtonContainer>
          </Form>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

const ContentContainer = styled.div`
  background: #ffffff;
  border-radius: 17px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 200px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #ced118;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #bfc017;
  }
`;

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

export default VolunteerDiary;
