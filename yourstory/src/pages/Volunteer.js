import React, { useState } from "react"; // useState 추가
import styled from "styled-components";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import VolunteerFilter from "../components/volunteer/VolunteerFilter";
import VolunteerList from "../components/volunteer/VolunteerList";
import NavBar from "../components/common/NavBar";
import { media } from "../styles/theme";
import theme from "../styles/theme";

const VolunteerPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const volunteers = [
    {
      id: 1,
      title: "지역 공원 환경정화",
      state: "모집 중",
      recruitmentStart: "2024-12-01",
      recruitmentEnd: "2024-12-15",
      period: "14",
      org: "서울시 강남구 자원봉사센터",
      day: "월요일",
      place: "서울 강남구 공원",
      person: 10,
    },
    {
      id: 2,
      title: "노인 돌봄 활동",
      state: "모집 완료",
      recruitmentStart: "2024-11-10",
      recruitmentEnd: "2024-11-20",
      period: "10",
      org: "서울시 종로구 노인복지센터",
      day: "화요일",
      place: "서울 종로구 노인센터",
      person: 5,
    },
    {
      id: 3,
      title: "아이들 교육 봉사",
      state: "모집 중",
      recruitmentStart: "2024-11-25",
      recruitmentEnd: "2024-12-05",
      period: "10",
      org: "서울시 마포구 교육지원센터",
      day: "수요일",
      place: "서울 마포구 초등학교",
      person: 8,
    },
  ];

  const handleSearch = (filters) => {
    // 필터링 로직
    const filteredResults = volunteers.filter((volunteer) => {
      // 지역 필터 (place 기준)
      if (filters.location.length > 0 && !filters.location.includes("전체")) {
        const hasMatchingLocation = filters.location.some((loc) =>
          volunteer.place.includes(loc)
        );
        if (!hasMatchingLocation) return false;
      }

      // 상태 필터 (state 기준)
      if (filters.status.length > 0 && !filters.status.includes("전체")) {
        if (!filters.status.includes(volunteer.state)) return false;
      }

      // 요일 필터 (day 기준)
      if (filters.day.length > 0 && !filters.day.includes("전체")) {
        if (!filters.day.includes(volunteer.day)) return false;
      }

      return true;
    });

    setSearchResults(filteredResults);
    setIsSearched(true);
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader />
        <VolunteerFilter onSearch={handleSearch} />
        <VolunteerList searchResults={searchResults} isSearched={isSearched} />
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

export default VolunteerPage;
