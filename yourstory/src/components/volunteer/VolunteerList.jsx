import styled from 'styled-components';
import { media } from '../../styles/theme';



const VolunteerList = () => {
    const volunteers = [
      {
        id: 1,
        center: '하늘꿈센터',
        status: '모집중',
        recruitPeriod: '2024-10-10 ~ 2024-12-31',
        organization: '금산군',
        period: '6개월',
        schedule: '매주 월/수/금 중 택 1'
      },
      {
        id: 2,
        center: '멋진사자센터',
        status: '모집중',
        recruitPeriod: '2024-08-14 ~ 2024-10-31',
        organization: '금산군',
        period: '4개월',
        schedule: '매주 수요일'
      },
      {
        id: 3,
        center: '기디센터',
        status: '모집완료',
        recruitPeriod: '2024-10-10 ~ 2024-12-31',
        organization: '금산군',
        period: '4개월',
        schedule: '매주 토요일'
      }
    ];
  
    return (
      <ListContainer>
        {volunteers.map(volunteer => (
          <VolunteerCard key={volunteer.id} data={volunteer} />
        ))}
      </ListContainer>
    );
  };
  
  const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #F3F3F3;
  border-radius: 17px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

  
  const VolunteerCard = ({ data }) => {
    return (
      <CardContainer>
        <CardHeader>
          <HeaderLeft>
            <CardTitle>
              <CenterName>{data.center}</CenterName>
              <StatusBadge status={data.status}>
                {data.status}
              </StatusBadge>
            </CardTitle>
            <InfoText>
              <InfoLabel>[모집기간]</InfoLabel> {data.recruitPeriod}
            </InfoText>
            <InfoText>
              <InfoLabel>[등록기관]</InfoLabel> {data.organization}
            </InfoText>
          </HeaderLeft>
          <HeaderRight>
            <InfoText>
              <InfoLabel>[봉사기간]</InfoLabel> {data.period}
            </InfoText>
            <InfoContainer>
              <InfoText>
                <InfoLabel>[봉사요일]</InfoLabel> {data.schedule}
              </InfoText>
              <DetailButton>자세히 보기</DetailButton>
            </InfoContainer>
          </HeaderRight>
        </CardHeader>
      </CardContainer>
    );
  };

  const CardContainer = styled.div`
  background: transparent;
  padding: 1.125rem;
  transition: transform 0.2s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 28px;
    right: 28px;
    height: 0.7px;
    background-color: #BCBF1F;
  }

  ${media.tablet} {
    padding: 1rem;
  }
`;
  
const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;
  
  const CardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `;
  
  const CenterName = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
    color: #919400;
  `;
  
  const StatusBadge = styled.span`
    padding: 0.25rem 2.6875rem;
    border-radius: 999px;
    font-size: 1.125rem;
    font-weight: 800;
    color: #CED118;
  `;
  
  const DetailButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background-color: #CED118;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: auto;
  
  &:hover {
    opacity: 0.9;
  }
`;
  
  const InfoText = styled.p`
    font-size: 1.125rem;
    color: #000000;
    font-weight: 350;
    margin: 0;
    line-height: 1.5;
  `;
  
  const InfoLabel = styled.span`
    color: #333;
    font-weight: 500;
  `;
  

  
  export default VolunteerList;

  