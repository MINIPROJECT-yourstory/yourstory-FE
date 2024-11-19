import React from "react";
import styled from "styled-components";

const ConfirmModal = ({
  message,
  onLeftClick,
  onRightClick,
  leftTxt,
  rightTxt,
}) => {
  return (
    <div>
      <ModalOverlay>
        <ModalWrapper>
          <ModalHeader>알림</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <YesBtn onClick={onLeftClick}> {leftTxt || "예"}</YesBtn>
            <NoBtn onClick={onRightClick}> {rightTxt || "아니오"}</NoBtn>
          </ModalFooter>
        </ModalWrapper>
      </ModalOverlay>
    </div>
  );
};

export default ConfirmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  width: 482px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f8ef;
  gap: 28px;
`;

const ModalHeader = styled.div`
  padding: 16px 0px;
  text-align: center;
  background-color: #bcbf1f;
  color: white;
  width: 482px;
  border-radius: 20px 20px 0px 0px;
  font-family: Inter;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  text-align: center;
  color: #919400;
  width: 290px;
  height: 93px;
  font-weight: 400;
  line-height: 40px;
  font-size: 20px;
  letter-spacing: -6%;
`;
const ModalFooter = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  gap: 26px;
`;

const YesBtn = styled.button`
  width: 151px;
  height: 39px;
  border-radius: 21px;
  cursor: pointer;
  background-color: #919400;
  font-weight: 700;
  color: white;
  border: none;
  font-size: 20px;
`;
const NoBtn = styled.button`
  width: 151px;
  height: 39px;
  border-radius: 21px;
  cursor: pointer;
  background-color: #ced118;
  font-weight: 700;
  color: white;
  border: none;
  font-size: 20px;
`;
