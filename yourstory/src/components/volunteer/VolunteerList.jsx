import styled from 'styled-components';


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
    gap: 1rem;
  `;
  
  // components/volunteer/VolunteerCard.jsx
  const VolunteerCard = ({ data }) => {
    return (
      <CardContainer>
        <CardHeader>
          <CardTitle>
            <CenterName>{data.center}</CenterName>
            <StatusBadge status={data.status}>
              {data.status}
            </StatusBadge>
          </CardTitle>
          <DetailButton>자세히 보기</DetailButton>
        </CardHeader>
        <CardContent>
          <InfoText>
            <InfoLabel>[모집기간]</InfoLabel> {data.recruitPeriod}
          </InfoText>
          <InfoText>
            <InfoLabel>[등록기관]</InfoLabel> {data.organization}
          </InfoText>
          <InfoText>
            <InfoLabel>[봉사기간]</InfoLabel> {data.period}
          </InfoText>
          <InfoText>
            <InfoLabel>[봉사요일]</InfoLabel> {data.schedule}
          </InfoText>
        </CardContent>
      </CardContainer>
    );
  };
  
  const CardContainer = styled.div`
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  `;
  
  const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  `;
  
  const CardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `;
  
  const CenterName = styled.h3`
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
  `;
  
  const StatusBadge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: ${props => props.status === '모집중' ? '#C5D82D' : '#666'};
    color: white;
  `;
  
  const DetailButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #C5D82D;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      opacity: 0.9;
    }
  `;
  
  const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;
  
  const InfoText = styled.p`
    font-size: 0.875rem;
    color: #666;
    line-height: 1.5;
  `;
  
  const InfoLabel = styled.span`
    color: #333;
    font-weight: 500;
  `;
  
  
  export default VolunteerList;

  