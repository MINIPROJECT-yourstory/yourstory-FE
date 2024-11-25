import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";
import { media } from "../../styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { volunteerApi } from "../../apis/volunteerApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { ReactComponent as DateIcon } from "../../assets/images/icon-date.svg";

const VolunteerDiary = () => {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const [diaryData, setDiaryData] = useState({
    conditionId: workId,
    date: new Date(),
    content: "",
  });

  useEffect(() => {
    if (!workId) {
      alert("잘못된 접근입니다.");
      navigate("/work/my-status");
      return;
    }
    fetchRecords();
  }, [workId]);

  const fetchRecords = async () => {
    try {
      const date = new Date().toISOString().split("T")[0];
      const currentRecords = await volunteerApi.getRecordDetail(workId, date);

      if (currentRecords) {
        const validRecords = Array.isArray(currentRecords)
          ? currentRecords
          : [currentRecords];
        const filteredRecords = validRecords.filter(
          (record) => record && record.content
        );
        setRecords(filteredRecords);
      }
    } catch (error) {
      console.error("기록 조회 중 에러:", error);
    }
  };

  const handleDateChange = (date) => {
    setDiaryData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleContentChange = (e) => {
    setDiaryData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordData = {
        conditionId: workId,
        date: diaryData.date.toISOString().split("T")[0],
        content: diaryData.content,
      };

      await volunteerApi.createRecord(recordData);
      await fetchRecords();

      setDiaryData((prev) => ({
        ...prev,
        content: "",
        date: new Date(),
      }));
      setShowForm(false);
    } catch (error) {
      alert(error.message || "자서전 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="status" />
        <DiaryTitleContainer>
          <DiaryTitle>자서전 기록장</DiaryTitle>
          <TitleLine />
        </DiaryTitleContainer>

        {showForm && (
          <DiaryForm onSubmit={handleSubmit}>
            <DateSection>
              <DatePickerWrapper>
                <StyledDateIcon
                  onClick={() => {
                    const datePickerInput = document.querySelector(
                      `#diary-date-${showForm ? "input" : "readonly"}`
                    );
                    datePickerInput?.click();
                  }}
                />
                <CustomDatePicker
                  id={`diary-date-${showForm ? "input" : "readonly"}`}
                  selected={diaryData.date}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <DateText>
                      {diaryData.date.toISOString().split("T")[0]}
                    </DateText>
                  }
                />
              </DatePickerWrapper>
            </DateSection>
            <ContentSection>
              <TextArea
                value={diaryData.content}
                onChange={handleContentChange}
                placeholder="(텍스트를 입력하세요)"
                required
              />
            </ContentSection>
          </DiaryForm>
        )}

        <AddButton onClick={() => setShowForm(true)}>
          <PlusIcon>+</PlusIcon>
        </AddButton>

        <SaveButton type="submit" onClick={handleSubmit}>
          저장하기
        </SaveButton>

        <DashedLine />

        <RecordsList>
          {records.map((record) => (
            <DiaryEntry key={record.id}>
              <DateSection>
                <DatePickerWrapper>
                  <StyledDateIcon />
                  <DateText>{record.date}</DateText>
                </DatePickerWrapper>
              </DateSection>
              <ContentSection>
                <ReadOnlyContent>{record.content}</ReadOnlyContent>
              </ContentSection>
            </DiaryEntry>
          ))}
        </RecordsList>
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

const DiaryTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 17px;
  margin-bottom: 60px;
  padding: 0;
`;

const DiaryTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #bcbf1f;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const TitleLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #bcbf1f;
`;

const DiaryForm = styled.form`
  width: 100%;
  height: 301px;
  border-radius: 17px;
  overflow: hidden;
`;

const DateSection = styled.div`
  height: 67px;
  background-color: #bcbf1f;
  padding: 20px 35px;
  display: flex;
  align-items: center;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
`;

const StyledDateIcon = styled(DateIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const DateText = styled.span`
  font-family: Inter;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -4%;
  color: #ffffff;
`;

const ContentSection = styled.div`
  height: 214px;
  background-color: #f3f3f3;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  background: none;
  resize: none;
  font-family: Inter;
  font-size: 24px;
  letter-spacing: -6%;
  color: #919400;

  &::placeholder {
    color: #919400;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  caret-color: #919400;
`;

const ReadOnlyContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #919400;
  font-family: Inter;
  font-size: 24px;
  letter-spacing: -6%;
  white-space: pre-wrap;
`;

const AddButton = styled.button`
  width: 236px;
  height: 39px;
  background-color: #ced118;
  border: none;
  border-radius: 50px;
  margin-top: 29px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled.span`
  color: #fafc97;
  font-size: 44px;
  line-height: 39px;
`;

const SaveButton = styled.button`
  width: 226px;
  height: 67.39px;
  background-color: #ced118;
  border: none;
  border-radius: 50px;
  color: #ffffff;
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -6%;
  margin-left: auto;
  display: block;
  cursor: pointer;
`;

const DashedLine = styled.div`
  width: 100%;
  height: 2px;
  margin: 70px 0;
  background-image: linear-gradient(to right, #ced118 50%, transparent 50%);
  background-size: 10px 2px;
  background-repeat: repeat-x;
`;

const DiaryEntry = styled(DiaryForm)`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomDatePicker = styled(DatePicker)`
  background: none;
  border: none;
  color: #ffffff;
  font-family: Inter;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -4%;
  cursor: pointer;
  width: auto;
`;

export default VolunteerDiary;
