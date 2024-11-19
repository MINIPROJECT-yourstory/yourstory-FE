import React from "react";
import styled from "styled-components";

const AccountInput = ({
  id,
  name,
  inputTitle,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>
      <InputTitle>{inputTitle}</InputTitle>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default AccountInput;

const InputTitle = styled.div`
  color: #fafc97;
  margin-bottom: 0.7rem;
  font-size: 18px;
  font-weight: 400;
  text-align: left;
`;

const Input = styled.input`
  border: none;
  background-color: #f6f8c3;
  font-size: 15px;
  width: 18.75rem;
  height: 2.375rem;
  border-radius: 0.6875rem;
  padding: 0rem 0.625rem;
  outline: none;
  &::placeholder {
    color: #c4c4c4;
  }
`;
