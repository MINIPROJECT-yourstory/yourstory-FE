import React, { useState, useEffect } from "react"; // useState 추가
import styled from "styled-components";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import VolunteerFilter from "../components/volunteer/VolunteerFilter";
import VolunteerList from "../components/volunteer/VolunteerList";
import NavBar from "../components/common/NavBar";
import { media } from "../styles/theme";
import { volunteerApi } from "../apis/volunteerApi";

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
      console.error("봉사 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
      const apiFilters = {
        regions: filters.location.includes("전체")
          ? null
          : filters.location.join(","),
        recruitmentStatus: filters.status.includes("전체")
          ? null
          : filters.status.join(","),
        dayOfWeek: filters.day.includes("전체") ? null : filters.day.join(","),
      };

      const filteredData = await volunteerApi.getVolunteerList(apiFilters);
      setSearchResults(filteredData);
      setIsSearched(true);
    } catch (error) {
      console.error("필터링 실패:", error);
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
