import React, { useState, useEffect } from "react"; // useState 추가
import styled from "styled-components";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import VolunteerFilter from "../components/volunteer/VolunteerFilter";
import VolunteerList from "../components/volunteer/VolunteerList";
import NavBar from "../components/common/NavBar";
import { media } from "../styles/theme";
import { volunteerApi } from "../apis/volunteerApi";
import LoadingSpinner from "../components/common/LoadingSpinner";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 데이터 로딩
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setIsLoading(true);
      const data = await volunteerApi.getVolunteerList();
      setVolunteers(data);
      setSearchResults(data);
    } catch (error) {
      console.error("봉사 목록 조회 패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
      console.log("검색 시작 - 원본 필터:", filters);

      // 평일/주말 여부에 따라 요일 배열 생성
      let dayOfWeek = null;
      if (filters.day.includes("평일")) {
        dayOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일"];
      } else if (filters.day.includes("주말")) {
        dayOfWeek = ["토요일", "일요일"];
      }

      const apiFilters = {
        regions: filters.location.includes("전체") ? null : filters.location[0],
        recruitmentStatus: filters.status.includes("전체")
          ? null
          : filters.status[0] === "모집중"
          ? "모집 중"
          : filters.status[0],
      };

      // 전체 데이터를 가져온 후 프론트에서 요일 필터링
      const response = await volunteerApi.getVolunteerList(apiFilters);

      // 요일 필터링 적용
      const filteredData = dayOfWeek
        ? response.filter((item) => dayOfWeek.includes(item.day))
        : response;

      setSearchResults(filteredData);
      setIsSearched(true);
    } catch (error) {
      console.error("필터링 실패:", error);
      alert("봉사 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar pagename={"volunteer"} />
      <PageContainer>
        <VolunteerHeader currentPage="apply" />
        <VolunteerFilter onSearch={handleSearch} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <VolunteerList
            searchResults={searchResults}
            isSearched={isSearched}
          />
        )}
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
