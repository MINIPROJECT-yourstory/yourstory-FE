import styled from 'styled-components';
import theme, { media } from '../../../src/styles/theme';




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
  background: ${({ theme }) => theme.colors.primary.main};  // #BCBF1F
  border-radius: ${({ theme }) => theme.borderRadius.sm};   // 17px
  margin: 0;
  padding: 0;
`;

const TitlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.padding.lg};  // 2rem
  
  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing.padding.xs} ${theme.spacing.padding.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  cursor: pointer;
  border: none;
`;

const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const FilterTitle = styled.div`
  padding: ${({ theme }) => `${theme.spacing.padding.sm} ${theme.spacing.padding.lg}`};
  background-color: ${({ theme }) => theme.colors.primary.light};  // #CED118
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};  // 20px
  margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  
  ${media.tablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    padding: ${({ theme }) => `0.75rem 1.5rem`};
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.padding.lg};
  background: ${({ theme }) => theme.colors.background.default};  // white
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  
  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const FilterSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};  // 1.125rem
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
  gap: ${({ theme }) => theme.spacing.padding.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};  // #666
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};  // #333
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
  gap: ${({ theme }) => theme.spacing.padding.sm};
  margin-top: ${({ theme }) => theme.spacing.padding.sm};
  padding: 0 0.5rem;
`;

const SearchButton = styled(Button)`
  width: 103px;
  height: 37px;
  background-color: ${({ theme }) => theme.colors.primary.light};  // #CED118
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};  // 15px
`;

const ResetButton = styled(Button)`
  width: 103px;
  height: 37px;
  background-color: #989971;  // 이 색상이 theme에 없다면 추가 필요
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};  // 15px
`;

export default VolunteerFilter;

