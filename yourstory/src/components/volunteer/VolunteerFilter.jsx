import styled from 'styled-components';
import { media } from '../../styles/theme';



const VolunteerFilter = () => {
  return (
    <FilterContainer>
      <FilterTitle>봉사 신청</FilterTitle>
      <FilterContent>
        <TitlesContainer>
          <FilterSectionTitle>봉사 지역/센터</FilterSectionTitle>
          <FilterSectionTitle>모집 상태</FilterSectionTitle>
          <FilterSectionTitle>요일</FilterSectionTitle>
        </TitlesContainer>
        
        <FilterGrid>
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
        </FilterGrid>
      </FilterContent>
      <ButtonContainer>
          <SearchButton>검색</SearchButton>
          <ResetButton>초기화</ResetButton>
        </ButtonContainer>
    </FilterContainer>
  );
};

const FilterContent = styled.div`
  background: #BCBF1F;
  border-radius: 17px;
  margin: 0;
  padding: 0;
`;

const TitlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

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
  
  ${media.tablet} {
    font-size: 16px;
    padding: 0.75rem 1.5rem;
  }
`;
  
const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  
  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;
  
const FilterSectionTitle = styled.h3`
    font-size: 1.125rem;
    color: white;
    font-weight: 700;
    margin: 0;
    padding: 18.5px 0;
    text-align: center;
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
    width: 103px;
    height: 37px;
    background-color: #CED118;
    border-radius: 50px;
    color: white;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    font-size:  0.9375rem;
  `;
  
const ResetButton = styled(Button)`
    width: 103px;
    height: 37px;
    background-color: #989971;
    color: white;
    border-radius: 50px;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    font-size:  0.9375rem;
  `;


export default VolunteerFilter;
