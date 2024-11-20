import React from "react";
import styled from "styled-components";
import NavBar from "../../components/common/NavBar";
import theme from "../../styles/theme";
import LibraryHeader from "../../components/library/LibraryHeader";

const LetterBox = () => {
  return (
    <div>
      <NavBar pagename={"library"} />
      <PageContainer>
        <LibraryHeader />
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
