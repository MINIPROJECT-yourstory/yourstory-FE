import styled from 'styled-components';


const VolunteerFilter = () => {
    return (
      <FilterContainer>
      <FilterTitle>봉사 신청</FilterTitle>
        <FilterGrid>
          <FilterSection>
            <FilterSectionTitle>봉사 지역/센터</FilterSectionTitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>전체</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>남일면</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>남이면</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>진산면</span>
              </CheckboxLabel>
            </CheckboxGroup>
          </FilterSection>
  
          <FilterSection>
            <FilterSectionTitle>모집 상태</FilterSectionTitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>전체</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>모집중</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>모집 완료</span>
              </CheckboxLabel>
            </CheckboxGroup>
          </FilterSection>
  
          <FilterSection>
            <FilterSectionTitle>요일</FilterSectionTitle>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>전체</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>평일</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <Checkbox type="checkbox" />
                <span>주말</span>
              </CheckboxLabel>
            </CheckboxGroup>
          </FilterSection>
        </FilterGrid>
        <ButtonContainer>
          <SearchButton>검색</SearchButton>
          <ResetButton>초기화</ResetButton>
        </ButtonContainer>
      </FilterContainer>
    );
  };

  const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;
  
  const FilterContainer = styled.div`
    margin-bottom: 2rem;
  `;
  
  const FilterTitle = styled.div`
    padding: 1rem 2rem;
    background-color: #CED118;
    color: white;
    font-size: 20px;
    margin-bottom: 1rem;
    font-weight: 700;
    border-radius: 50px;
  `;
  
  const FilterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
  `;
  
  const FilterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;
  
  const FilterSectionTitle = styled.h3`
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 0.5rem;
  `;
  
  const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `;
  
  const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  `;
  
  const Checkbox = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
  `;
  
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    padding: 0 0.5rem;
  `;
  
  const SearchButton = styled(Button)`
    background-color: #C5D82D;
    color: white;
    padding: 0.5rem 2rem;
  `;
  
  const ResetButton = styled(Button)`
    background-color: #666;
    color: white;
    padding: 0.5rem 2rem;
  `;


export default VolunteerFilter;
