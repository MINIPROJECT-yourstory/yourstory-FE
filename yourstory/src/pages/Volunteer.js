import React from 'react';
import styled from 'styled-components';
import VolunteerHeader from '../components/volunteer/VolunteerHeader';
import VolunteerFilter from '../components/volunteer/VolunteerFilter';
import VolunteerList from '../components/volunteer/VolunteerList';


const VolunteerPage = () => {
  return (
    <PageContainer>
      <VolunteerHeader />
      <VolunteerFilter />
      <VolunteerList />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 81px 89px;
`;

export default VolunteerPage;