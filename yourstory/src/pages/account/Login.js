import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AccountInput from "../../components/account/AccountInput";
import LogoZone from "../../components/account/LogoZone";
import AccountButton from "../../components/account/AccountButton";
// import axios from "axios";
import { accountApi } from "../../apis/accountApi";

const Login = () => {
  const navigate = useNavigate();
  // const baseURL = process.env.REACT_APP_baseURL;
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isUsername = Boolean(formValue.username);
  const isPassword = Boolean(formValue.password);

  const handleLogin = async () => {
    if (!isUsername) {
      return alert("이메일을 입력해주세요.");
    } else if (!isPassword) {
      return alert("비밀번호를 입력해주세요.");
    }

    try {
      // 로그인 API 호출
      const response = await accountApi.postLogin(formValue);

      // 성공 시 navigate 실행
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      // 에러 발생 시 navigate를 실행하지 않음
      console.error("로그인 중 오류 발생:", error);

      // 사용자에게 적절한 에러 메시지 표시
      if (error.response?.status === 401) {
        alert("아이디와 비밀번호를 다시 확인해 주세요!");
      } else {
        alert("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <Left>
          <LogoZone />
        </Left>
        <Right>
          <Title>로그인</Title>
          <FormContainer>
            <AccountInput
              id="username"
              name="username"
              inputTitle="아이디"
              value={formValue.username}
              onChange={handleChange}
              type="username"
            />
            <AccountInput
              id="password"
              name="password"
              inputTitle="비밀번호"
              value={formValue.password}
              onChange={handleChange}
              type="password"
            />
          </FormContainer>
          <StyledLink to="/register">회원가입이 필요한가요?</StyledLink>
          <BtnBox>
            <AccountButton
              txt={"메인페이지"}
              onBtnClick={() => navigate("/")}
            />
            <AccountButton
              txt={"로그인"}
              backgroundColor={"#EAF0C3"}
              color={"#919400"}
              onBtnClick={handleLogin}
            />
          </BtnBox>
        </Right>
      </Wrapper>
    </div>
  );
};

export default Login;

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
  margin-bottom: 8.125rem;
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
  gap: 1.75rem;
`;

const StyledLink = styled(Link)`
  width: 320px;
  text-align: right;
  color: #fafc97;
  text-decoration: none;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;
const BtnBox = styled.div`
  display: flex;
  gap: 1.1875rem;
  margin-top: 4rem;
`;
