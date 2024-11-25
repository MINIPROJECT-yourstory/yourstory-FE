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
  const [allRecords, setAllRecords] = useState([]);

  const [diaryData, setDiaryData] = useState({
    conditionId: workId,
    date: new Date(),
    content: "",
  });

  const fetchRecordsByDate = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const currentRecords = await volunteerApi.getRecordDetail(
        workId,
        formattedDate
      );

      if (currentRecords) {
        const validRecords = Array.isArray(currentRecords)
          ? currentRecords
          : [currentRecords];
        const filteredRecords = validRecords.filter(
          (record) => record && record.content
        );

        setAllRecords((prevRecords) => {
          const newRecords = [...prevRecords, ...filteredRecords];
          return Array.from(
            new Map(newRecords.map((record) => [record.id, record])).values()
          ).sort((a, b) => new Date(b.date) - new Date(a.date));
        });
      }
    } catch (error) {
      console.error("기록 조회 중 에러:", error);
    }
  };

  useEffect(() => {
    if (!workId) {
      alert("잘못된 접근입니다.");
      navigate("/work/my-status");
      return;
    }

    const fetchLast3MonthsRecords = async () => {
      const today = new Date();
      const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

      for (
        let d = new Date();
        d >= threeMonthsAgo;
        d.setDate(d.getDate() - 1)
      ) {
        await fetchRecordsByDate(new Date(d));
      }
    };

    fetchLast3MonthsRecords();
  }, [workId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateChange = (date) => {
    setDiaryData((prev) => ({
      ...prev,
      date: date,
    }));
    fetchRecordsByDate(date);
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
      await fetchRecordsByDate(diaryData.date);

      setDiaryData((prev) => ({
        ...prev,
        content: "",
      }));
      setShowForm(false);
    } catch (error) {
      alert(error.message || "자서전 저장에 실패했습니다.");
    }
  };

  const handleAddButtonClick = () => {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    setDiaryData((prev) => ({
      ...prev,
      date: today,
      content: "",
    }));
    setShowForm(true);
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

        <ButtonContainer>
          <AddButton onClick={handleAddButtonClick}>
            <PlusIcon>+</PlusIcon>
          </AddButton>
        </ButtonContainer>

        <SaveButton type="submit" onClick={handleSubmit}>
          저장하기
        </SaveButton>

        <DashedLine />

        <RecordsList>
          {allRecords.map((record) => (
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
  max-width: 100%;
  overflow-x: hidden;

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
  margin-top: 50px;
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
  height: 350px;
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const DateSection = styled.div`
  height: 67px;
  background-color: #bcbf1f;
  padding: 20px 35px;
  display: flex;
  align-items: center;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
`;

const StyledDateIcon = styled(DateIcon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const DateText = styled.span`
  font-family: Inter;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -0.04em;
  color: #ffffff;
`;

const ContentSection = styled.div`
  flex: 1;
  background-color: #f3f3f3;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  overflow: hidden;
  position: relative;
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
  letter-spacing: -0.06em;
  color: #919400;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;

  &::placeholder {
    color: #919400;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  caret-color: #919400;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
  }

  &::-webkit-scrollbar-thumb {
    background: #bcbf1f;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #919400;
  }
`;

const ReadOnlyContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #919400;
  font-family: Inter;
  font-size: 24px;
  letter-spacing: -0.06em;
  white-space: pre-wrap;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
  }

  &::-webkit-scrollbar-thumb {
    background: #bcbf1f;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #919400;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 29px;
  position: relative;
  height: 39px;
`;

const AddButton = styled.button`
  width: 236px;
  height: 100%;
  background-color: #ced118;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlusIcon = styled.span`
  color: #fafc97;
  font-size: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  width: 226px;
  height: 67.39px;
  background-color: #ced118;
  border: none;
  border-radius: 50px;
  color: #ffffff;
  font-family: Inter;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.06em;
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
  letter-spacing: -0.04em;
  cursor: pointer;
  width: auto;
`;

export default VolunteerDiary;
