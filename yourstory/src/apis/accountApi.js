import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("access");
  console.log("가져온 토큰:", token); // 토큰 값 확인
  return token;
};

// 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log("생성된 헤더:", headers); // 헤더 확인
  return headers;
};

export const accountApi = {
  postLogin: async (formValue) => {
    try {
      const response = await axios.post(`${baseURL}/login`, formValue);
      console.log(response);
      localStorage.clear();
      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("access", token.split(" ")[1]);
      }
    } catch (error) {
      throw error;
    }
  },
};
