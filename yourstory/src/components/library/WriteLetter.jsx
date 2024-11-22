import React, { useState } from "react";
import styled from "styled-components";

const WriteLetter = () => {
  const [postValue, setPostValue] = useState({
    title: "",
    content: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setPostValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const isFilled = Boolean(postValue.title) && Boolean(postValue.content);
  //   const SubmitLetter = () => {
  //     if (!isFilled) {
  //       alert("모든 항목을 입력해 주세요");
  //     } else {
  //       axios
  //         .post(`${baseURL}/letter/{book_id}`, postValue, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //         .then((response) => {
  //           alert(response.data);
  //           setPostValue({
  //             title: "",
  //             content: "",
  //           });
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           alert("편지 작성을 실패했습니다.");
  //         });
  //     }
  //   };
  return (
    <div>
      <Wrapper>
        <TitleInput
          type="text"
          placeholder="(제목을 입력하세요)"
          value={postValue.title}
          onChange={onChange}
          name={"title"}
        />
        <ContentTextArea
          placeholder="(내용을 입력하세요)"
          value={postValue.content}
          onChange={onChange}
          name={"content"}
        />
        <WriteBtn>작성 완료</WriteBtn>
      </Wrapper>
    </div>
  );
};

export default WriteLetter;

const Wrapper = styled.div`
  height: 12rem;
  background-color: #eaf0c3;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2.5rem;
`;

const TitleInput = styled.input`
  font-family: Inter;
  padding: 0.4rem 0.5rem 0.7rem 0.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background-color: transparent;
  border: none;
  outline: none;
  letter-spacing: -6%;
  line-height: 24.2px;
  border-bottom: 2px solid var(--green);
  &::placeholder {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ContentTextArea = styled.textarea`
  font-family: Inter;
  padding: 0rem 0.5rem 1rem 0.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  resize: none;
  outline: none;
  border: none;
  background-color: transparent;
  letter-spacing: -6%;
  line-height: 19.36px;
  height: 4.5625rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const WriteBtn = styled.button`
  font-family: Inter;
  width: 110px;
  height: 37px;
  border-radius: 50px;
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-left: auto;
  cursor: pointer;
`;
