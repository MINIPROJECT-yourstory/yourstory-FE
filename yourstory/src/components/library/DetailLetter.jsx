import React, { useState } from "react";
import styled from "styled-components";
import MailIcon from "../../assets/images/icon-email.svg";
import ConfirmModal from "../common/ConfirmModal";
import axios from "axios";

const DetailLetter = ({ letter, index, onBtnClick, isMine }) => {
  const baseURL = process.env.REACT_APP_baseURL;
  const access = localStorage.getItem("access");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const onConfirm = (letter_id) => {
    axios
      .delete(`${baseURL}/letter/${letter_id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((response) => {
        setIsConfirmOpen(false);
        alert("편지가 삭제되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        setIsConfirmOpen(false);
        console.log(error);
        alert("편지 삭제에 실패했습니다.");
      });
  };

  return (
    <div>
      <Wrapper id={letter.id}>
        <TitleBox onClick={onBtnClick}>
          <Order>{index}</Order>
          <Icon src={MailIcon} alt="편지 아이콘" />
          <Title>{letter.title}</Title>
        </TitleBox>
        <ContentBox>
          <Content>{letter.content}</Content>
          {isMine ? (
            <BtnContainer>
              <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
            </BtnContainer>
          ) : (
            ""
          )}
        </ContentBox>
      </Wrapper>
      {isConfirmOpen && (
        <ConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={() => onConfirm(letter.id)}
          message={"편지를 삭제할까요?"}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default DetailLetter;

const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  border-bottom: 1.3px dashed #fafc97;
  cursor: pointer;
  padding: 0.3rem 0;
`;

const Order = styled.div`
  width: 1rem;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;
const Icon = styled.img`
  width: 29px;
  height: 29px;
`;
const Title = styled.div`
  color: white;
  margin-left: 0.93rem;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Content = styled.div`
  font-weight: 700;
  line-height: 18px;
  letter-spacing: -0.06em;
  text-align: left;
  padding-bottom: 0.5rem;
  color: #fafc97;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.87rem;
  padding: 0rem 1rem;
`;
const ContentBox = styled.div`
  margin-left: 6.5rem;
  margin-right: 5.667rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0rem;
`;

const BtnContainer = styled.div`
  border-top: 1.3px dashed #919400;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const DeleteBtn = styled.div`
  border: none;
  background: #bcbf1f;
  color: white;
  font-family: Inter;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 18px;
  letter-spacing: -0.06em;
  padding: 5px 15px;
  text-align: center;
  border-radius: 7px;
  margin-top: 0.5rem;
  margin-left: auto;
  cursor: pointer;
`;
