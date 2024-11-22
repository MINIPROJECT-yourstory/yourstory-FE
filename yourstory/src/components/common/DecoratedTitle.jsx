import React from "react";
import styled from "styled-components";

const DecoratedTitle = ({
  frontText,
  middleText,
  backText,
  frontWeight = "400",
  middleWeight = "bold",
  backWeight = "bold",
  className,
}) => (
  <TitleWrapper className={className}>
    <TitleContainer>
      <BackgroundLayer>
        {backText && (
          <TitleText $weight={backWeight} $width="100%">
            {backText}
          </TitleText>
        )}
      </BackgroundLayer>
      <MiddleLayer>
        {middleText && (
          <TitleText $weight={middleWeight} $width="70%">
            {middleText}
          </TitleText>
        )}
      </MiddleLayer>
      <FrontLayer>
        {frontText && (
          <TitleText $weight={frontWeight} $width="25%">
            {frontText}
          </TitleText>
        )}
      </FrontLayer>
    </TitleContainer>
  </TitleWrapper>
);

const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #b0b41a;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MiddleLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 70%;
  background-color: #bcbf1f;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrontLayer = styled.div`
  position: relative;
  height: 100%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.padding.lg};
  background-color: #ced118;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
`;

const TitleText = styled.div`
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ $weight }) => $weight};
  width: ${({ $width }) => $width};
  text-align: center;
  position: absolute;

  ${({ $width }) => {
    if ($width === "25%") {
      // FrontLayer 텍스트
      return `
        left: 110px; 
      `;
    }
    if ($width === "70%") {
      // MiddleLayer 텍스트
      return `
        left: 235px;
      `;
    }
    if ($width === "100%") {
      // BackgroundLayer 텍스트
      return `
        right: 800px;
      `;
    }
  }}

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export default DecoratedTitle;
