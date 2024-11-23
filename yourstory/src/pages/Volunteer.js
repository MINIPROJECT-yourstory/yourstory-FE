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
      console.error("봉사 목록 조회 ���패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
      console.log("검색 시작 - 원본 필터:", filters);

      // API 요청용 필터 데이터 변환
      const apiFilters = {
        regions: filters.location.filter((loc) => loc !== "전체"),
        recruitmentStatus: filters.status
          .filter((status) => status !== "전체")
          .map((status) => {
            // "모집중" -> "모집 중" 변환
            if (status === "모집중") return "모집 중";
            return status;
          }),
        dayOfWeek: [],
      };

      // 요일 처리
      if (!filters.day.includes("전체")) {
        if (filters.day.includes("평일")) {
          apiFilters.dayOfWeek.push(
            ...["월요일", "화요일", "수요일", "목요일", "금요일"]
          );
        }
        if (filters.day.includes("주말")) {
          apiFilters.dayOfWeek.push(...["토요일", "일요일"]);
        }
        // 개별 요일 추가
        filters.day.forEach((day) => {
          if (!["전체", "평일", "주말"].includes(day)) {
            apiFilters.dayOfWeek.push(day);
          }
        });
      }

      console.log("변환된 API 필터:", apiFilters);

      const filteredData = await volunteerApi.getVolunteerList(apiFilters);
      console.log("필터링 결과:", filteredData);

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
