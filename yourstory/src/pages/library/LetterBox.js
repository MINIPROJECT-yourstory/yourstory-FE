import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import LibraryHeader from "../../components/library/LibraryHeader";
import Letter from "../../components/library/Letter";
import WriteLetter from "../../components/library/WriteLetter";

const LetterBox = () => {
  return (
    <div>
      <NavBar pagename={"library"} />
      <PageContainer>
        <LibraryHeader />
        <LetterWrapper>
          <HeaderTitle style={{ fontSize: "1.5rem" }}>
            우편함
            <HeaderLine />
          </HeaderTitle>
          <LetterContainer>
            <Letter />
          </LetterContainer>
        </LetterWrapper>
        <WriteWrapper>
          <HeaderTitle style={{ fontSize: "1.25rem" }}>
            <span>나의 편지 남기기</span>
            <DashedLine />
          </HeaderTitle>
          <WriteLetter />
        </WriteWrapper>
      </PageContainer>
    </div>
  );
};

export default LetterBox;

const PageContainer = styled.div`
  padding: 81px 5%;
  margin-left: 16.5625rem;
  font-family: Inter;
`;

const LetterWrapper = styled.div`
  margin-left: 1rem;
`;

const HeaderTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 1rem;
  > span {
    width: 11rem;
    margin-left: 1.3125rem;
  }
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid var(--green);
  flex: 1;
  height: 1px;
`;

const LetterContainer = styled.div`
  padding: 1.125rem 1.8125rem;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.padding.md};
  min-height: 11.5rem;
  overflow-y: scroll;
`;

const WriteWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing.padding.sm};
  margin-top: ${({ theme }) => theme.spacing.padding.md};
`;

const DashedLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 2rem 0;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.light} 50%,
    transparent 50%
  );
  background-size: 10px 2px;
  background-repeat: repeat-x;
`;
