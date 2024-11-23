import styled from "styled-components";
import { media } from "../../../src/styles/theme";
import { useState } from "react";
import DecoratedTitle from "../common/DecoratedTitle";

const VolunteerFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: [],
    status: [],
    day: [],
  });

  const handleCheckboxChange = (category, value) => {
    console.log(`체크박스 변경: ${category} - ${value}`);

    setFilters((prev) => {
      const updated = { ...prev };
      if (value === "전체") {
        updated[category] = updated[category].includes("전체") ? [] : ["전체"];
      } else {
        const withoutAll = prev[category].filter((item) => item !== "전체");
        if (withoutAll.includes(value)) {
          updated[category] = withoutAll.filter((item) => item !== value);
        } else {
          updated[category] = [...withoutAll, value];
        }
      }
      console.log("업데이트된 필터:", updated);
      return updated;
    });
  };

  const handleSearch = () => {
    console.log("필터 검색 시작");
    console.log("현재 필터 상태:", filters);

    // 필터 데이터 정리
    const searchFilters = {
      location: filters.location.includes("전체") ? [] : filters.location,
      status: filters.status.includes("전체") ? [] : filters.status,
      day: filters.day.includes("전체") ? [] : filters.day,
    };

    console.log("적리된 검색 필터:", searchFilters);
    onSearch(searchFilters);
  };

  const handleReset = () => {
    setFilters({
      location: [],
      status: [],
      day: [],
    });
  };

  return (
    <FilterContainer>
      <DecoratedTitle frontText="봉사 신청" frontWeight="bold" />
      <FilterContent>
        <TitlesContainer>
          <FilterSectionTitle>봉사 지역/센터</FilterSectionTitle>
          <FilterSectionTitle>모집 상태</FilterSectionTitle>
          <FilterSectionTitle>요일</FilterSectionTitle>
        </TitlesContainer>

        <FilterGrid>
          <CheckboxGroup>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("전체")}
                onChange={() => handleCheckboxChange("location", "전체")}
              />
              <span>전체</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("남일면")}
                onChange={() => handleCheckboxChange("location", "남일면")}
              />
              <span>남일면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("남이면")}
                onChange={() => handleCheckboxChange("location", "남이면")}
              />
              <span>남이면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("진산면")}
                onChange={() => handleCheckboxChange("location", "진산면")}
              />
              <span>진산면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("금성면")}
                onChange={() => handleCheckboxChange("location", "금성면")}
              />
              <span>금성면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("군북면")}
                onChange={() => handleCheckboxChange("location", "군북면")}
              />
              <span>군북면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("복수면")}
                onChange={() => handleCheckboxChange("location", "복수면")}
              />
              <span>복수면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("부리면")}
                onChange={() => handleCheckboxChange("location", "부리면")}
              />
              <span>부리면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("제원면")}
                onChange={() => handleCheckboxChange("location", "제원면")}
              />
              <span>제원면</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.location.includes("추부면")}
                onChange={() => handleCheckboxChange("location", "추부면")}
              />
              <span>추부면</span>
            </LocationStatusLabel>
          </CheckboxGroup>

          <CheckboxGroup>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.status.includes("전체")}
                onChange={() => handleCheckboxChange("status", "전체")}
              />
              <span>전체</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.status.includes("모집중")}
                onChange={() => handleCheckboxChange("status", "모집중")}
              />
              <span>모집중</span>
            </LocationStatusLabel>
            <LocationStatusLabel>
              <input
                type="checkbox"
                checked={filters.status.includes("모집 완료")}
                onChange={() => handleCheckboxChange("status", "모집 완료")}
              />
              <span>모집 완료</span>
            </LocationStatusLabel>
          </CheckboxGroup>

          <CheckboxGroup>
            {" "}
            <DayCheckboxLabel>
              <DayCheckbox
                type="checkbox"
                checked={filters.day.includes("전체")}
                onChange={() => handleCheckboxChange("day", "전체")}
              />
              <span>전체</span>
            </DayCheckboxLabel>
            <DayCheckboxLabel>
              <DayCheckbox
                type="checkbox"
                checked={filters.day.includes("평일")}
                onChange={() => handleCheckboxChange("day", "평일")}
              />
              <span>평일</span>
            </DayCheckboxLabel>
            <DayCheckboxLabel>
              <DayCheckbox
                type="checkbox"
                checked={filters.day.includes("주말")}
                onChange={() => handleCheckboxChange("day", "주말")}
              />
              <span>주말</span>
            </DayCheckboxLabel>
          </CheckboxGroup>
        </FilterGrid>
      </FilterContent>
      <ButtonContainer>
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        <ResetButton onClick={handleReset}>초기화</ResetButton>
      </ButtonContainer>
    </FilterContainer>
  );
};

const FilterContent = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.15);
  margin: 0;
  padding: 0;
  height: 261px;
  overflow: hidden;
`;

const TitlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: ${({ theme }) => theme.colors.primary.main};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.sm};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  z-index: 1;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) =>
    `${theme.spacing.padding.xs} ${theme.spacing.padding.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  cursor: pointer;
  border: none;
`;

const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.padding.lg};
  background: #f3f3f3;
  padding: 25px 35px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  position: relative;

  // 첫 번째 구분선
  &::before {
    content: "";
    position: absolute;
    left: calc(33.33%);
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background-color: #bcbf1f;
  }

  // 두 번째 구분선
  &::after {
    content: "";
    position: absolute;
    left: calc(66.66%);
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background-color: #bcbf1f;
  }

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);

    // 태블릿 크기에서는 첫 번째 구분선만 표시
    &::before {
      left: 50%;
    }

    // 두 번째 구분선 숨기기
    &::after {
      display: none;
    }
  }

  ${media.tablet} {
    grid-template-columns: 1fr;

    // 모바일에서는 구분선 모두 숨기기
    &::before,
    &::after {
      display: none;
    }
  }
`;

const FilterSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md}; // 1.125rem
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  padding: 18.5px 0;
  text-align: center;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;

  &:first-child {
    max-height: 150px;
    overflow-y: auto;

    // 스크롤바 스타일링 (선택사항)
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #bcbf1f;
      border-radius: 3px;
    }
  }
`;

const LocationStatusLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.padding.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 100%;

  input {
    display: none;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }

  input:checked + span {
    color: #bcbf1f;
    font-weight: 500;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const DayCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.padding.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 100%;

  span {
    font-size: 16px;
    font-weight: 500;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const DayCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ced118;
  border-radius: 3px;
  cursor: pointer;
  margin: 0;

  &:checked {
    background-color: #ced118;
    border-color: #ced118;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.padding.sm};
  margin-top: 40px;
  padding: 0 0.5rem;
`;

const SearchButton = styled(Button)`
  width: 103px;
  height: 37px;
  background-color: ${({ theme }) => theme.colors.primary.light}; // #CED118
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}; // 15px
`;

const ResetButton = styled(Button)`
  width: 103px;
  height: 37px;
  background-color: #989971; // 이 색상이 theme에 없다면 추가 필요
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}; // 15px
`;

export default VolunteerFilter;
