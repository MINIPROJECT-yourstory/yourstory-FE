import React from 'react';
import styled from 'styled-components';
import theme, { media } from '../../styles/theme';

const LibraryHeader = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        이타적 도서관
        <HeaderLine />
      </HeaderTitle>
      <SubTitleWrapper>
        <SubTitle>이타적 자서전</SubTitle>
      </SubTitleWrapper>
      <HeaderLine />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.padding.md};
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
  flex: 1; 
  height: 1px;

  &:last-child {  
    margin-top: -1px;
  }
`;

const HeaderTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};  // 30px
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.md};
  position: relative;
  z-index: 0;

  ${media.tablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};  // 24px
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;  
  margin-top: -19px;
  height: 94px;
  
  ${media.tablet} {
    margin-top: 0;         // margin-top 제거
    padding-bottom: 2px;   // HeaderLine과 정렬을 맞추기 위한 미세 조정
    justify-content: flex-end; 
    position: relative;
    z-index: 1;
    align-items: flex-end;  // 하단 정렬
  }
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  height: 94px;
  width: 175px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.white};
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.tablet} {
    height: 50px;
    width: 120px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-bottom: 0;      // 하단 여백 제거
  }

  ${media.mobile} {
    height: 40px;
    width: 100px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.padding.xs};
  }
`;

export default LibraryHeader;