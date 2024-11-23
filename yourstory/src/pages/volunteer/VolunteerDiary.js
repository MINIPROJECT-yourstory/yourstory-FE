import React, { useState, useEffect } from "react";
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
  const [records, setRecords] = useState([]);

  const [diaryData, setDiaryData] = useState({
    conditionId: workId,
    date: new Date().toISOString().split("T")[0],
    content: "",
  });

  console.log("전달받은 workId:", workId);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        console.log("기록 조회 시작 - workId:", workId);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        console.log("조회 기간:", startDate, "~", endDate);

        const currentDateStr = new Date().toISOString().split("T")[0];
        const currentRecords = await volunteerApi.getRecordDetail(
          workId,
          currentDateStr
        );

        console.log("현재 날짜 기록:", currentRecords);

        const validRecords = Array.isArray(currentRecords)
          ? currentRecords
          : [currentRecords];
        const filteredRecords = validRecords.filter(
          (record) => record && record.content
        );

        console.log("필터링된 기록:", filteredRecords);
        setRecords(filteredRecords);
      } catch (error) {
        console.error("기록 조회 중 에러:", error);
      }
    };

    if (workId) {
      fetchRecords();
    }
  }, [workId]);

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
      console.log("자서전 작성 성공!");

      const newRecords = await volunteerApi.getRecordDetail(
        workId,
        diaryData.date
      );
      console.log("새로 조회된 기록:", newRecords);

      const validRecords = Array.isArray(newRecords)
        ? newRecords
        : [newRecords];
      const filteredRecords = validRecords.filter(
        (record) => record && record.content
      );

      if (filteredRecords.length > 0) {
        setRecords(filteredRecords);
      }

      setDiaryData((prev) => ({
        ...prev,
        content: "",
        date: new Date().toISOString().split("T")[0],
      }));
    } catch (error) {
      console.error("자서전 작성 실패 상세:", error);
      alert(error.message || "자서전 저장에 실패했습니다.");
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

          <RecordsList>
            <RecordsTitle>작성된 기록</RecordsTitle>
            {records && records.length > 0 ? (
              records.map((record) => (
                <RecordItem key={record.id}>
                  <RecordDate>{record.date}</RecordDate>
                  <RecordContent>{record.content}</RecordContent>
                </RecordItem>
              ))
            ) : (
              <EmptyMessage>작성된 기록이 없습니다.</EmptyMessage>
            )}
          </RecordsList>
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

const RecordsList = styled.div`
  margin-top: 3rem;
  border-top: 2px solid #eee;
  padding-top: 2rem;
`;

const RecordsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

const RecordItem = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const RecordDate = styled.div`
  font-weight: 600;
  color: #7f810d;
  margin-bottom: 0.5rem;
`;

const RecordContent = styled.div`
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

export default VolunteerDiary;
