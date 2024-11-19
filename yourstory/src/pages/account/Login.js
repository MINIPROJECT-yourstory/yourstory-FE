import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountInput from "../../components/account/AccountInput";
import LogoZone from "../../components/account/LogoZone";
import AccountButton from "../../components/account/AccountButton";

const Login = () => {
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

  //   const isUsername = Boolean(formValue.username);
  //   const isPassword = Boolean(formValue.password);

  //   const handleLogin = () => {
  //     if (!isUsername) {
  //       return alert("이메일을 입력해주세요.");
  //     } else if (!isPassword) {
  //       return alert("비밀번호를 입력해주세요.");
  //     } else {
  //       axios
  //         .post(`${baseURL}/login/`, formValue)
  //         .then((response) => {
  //           console.log(response);
  //           alert("로그인 성공!");
  //           localStorage.clear();
  //           const userInfo = response.data;
  //           localStorage.setItem("access", userInfo.access);
  //           localStorage.setItem("refresh", userInfo.refresh);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   };

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
            <AccountButton txt={"메인페이지"} />
            <AccountButton
              txt={"로그인"}
              backgroundColor={"#EAF0C3"}
              color={"#919400"}
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
  background-color: #bcbf1f;
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
