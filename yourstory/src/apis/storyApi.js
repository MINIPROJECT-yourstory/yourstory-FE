import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("access");
  //   console.log("가져온 토큰:", token);
  return token;
};

// 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  //   console.log("생성된 헤더:", headers);
  return headers;
};

export const storyApi = {
  getStoryList: async () => {
    try {
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/story`, {
        headers,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
