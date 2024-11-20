import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import theme from "../../styles/theme";
import LibraryHeader from "../../components/library/LibraryHeader";
import Letter from "../../components/library/Letter";

const LetterBox = () => {
  return (
    <div>
      <NavBar pagename={"library"} />
      <PageContainer>
        <LibraryHeader />
        <HeaderTitle>
          우편함
          <HeaderLine />
        </HeaderTitle>
        <Letter />
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

const HeaderTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: 24px;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid var(--green);
  flex: 1;
  height: 1px;
`;
