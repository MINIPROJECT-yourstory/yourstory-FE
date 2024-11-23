import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Line from "../../assets/images/line-register.svg";
import AccountInput from "../../components/account/AccountInput";
import LogoZone from "../../components/account/LogoZone";
import AccountButton from "../../components/account/AccountButton";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_baseURL;
  const [formValue, setFormValue] = useState({
    nickname: "",
    username: "",
    username2: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFilled =
    Boolean(formValue.nickname) &&
    Boolean(formValue.username) &&
    Boolean(formValue.username2) &&
    Boolean(formValue.password) &&
    Boolean(formValue.password2);

  const handleSignup = () => {
    if (!isFilled) {
      return alert("모든 항목을 입력해 주세요.");
    } else {
      axios
        .post(`${baseURL}/join`, formValue)
        .then((response) => {
          console.log(response);
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        })
        .catch((error) => {
          if (error === "Usernames do not match") {
            alert("아이디와 아이디 확인이 일치하지 않습니다.");
          } else if (error === "Passwords do not match") {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          } else if (error === "The username already exists") {
            alert("해당 아이디가 이미 존재합니다.");
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div>
      <Wrapper>
        <Left>
          <LogoZone />
        </Left>
        <Right>
          <Title>회원가입</Title>
          <FormContainer>
            <AccountInput
              id="nickname"
              name="nickname"
              inputTitle="닉네임"
              value={formValue.nickname}
              onChange={handleChange}
              type="nickname"
            />
            <img src={Line} alt="line" />
            <AccountInput
              id="username"
              name="username"
              inputTitle="아이디"
              value={formValue.username}
              onChange={handleChange}
              type="username"
            />
            <AccountInput
              id="username2"
              name="username2"
              inputTitle="아이디 확인"
              value={formValue.username2}
              onChange={handleChange}
              type="username2"
            />
            <img src={Line} alt="line" />
            <AccountInput
              id="password"
              name="password"
              inputTitle="비밀번호"
              value={formValue.password}
              onChange={handleChange}
              type="password"
            />
            <AccountInput
              id="password2"
              name="password2"
              inputTitle="비밀번호 확인"
              value={formValue.password2}
              onChange={handleChange}
              type="password"
            />
          </FormContainer>
          <BtnBox>
            <AccountButton
              txt={"메인페이지"}
              onBtnClick={() => navigate("/")}
            />
            <AccountButton
              txt={"회원가입"}
              backgroundColor={"#EAF0C3"}
              color={"#919400"}
              onBtnClick={handleSignup}
            />
          </BtnBox>
        </Right>
      </Wrapper>
    </div>
  );
};

export default Register;

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
`;

const Left = styled.div``;

const Title = styled.div`
  color: #fafc97;
  font-family: Inter;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 1.875rem;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--green);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 1.1875rem;
  margin-top: 3.25rem;
`;
