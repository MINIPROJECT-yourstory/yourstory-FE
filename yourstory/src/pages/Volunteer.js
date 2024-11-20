import React from 'react';
import styled from 'styled-components';
import VolunteerHeader from '../components/volunteer/VolunteerHeader';
import VolunteerFilter from '../components/volunteer/VolunteerFilter';
import VolunteerList from '../components/volunteer/VolunteerList';
import NavBar from "../components/common/NavBar";
import { media } from '../styles/theme';



const VolunteerPage = () => {
  return (
    <div>
      <NavBar />  
      <PageContainer>
        <VolunteerHeader />
        <VolunteerFilter />
        <VolunteerList />
      </PageContainer>
    </div>
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