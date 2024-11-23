import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;
console.log("현재 baseURL:", baseURL); // baseURL 확인

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("accessToken");
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

export const bookApi = {
  // 도서 목록 조회
  getBooks: async () => {
    try {
      console.log("도서 목록 조회 시작");
      const headers = getAuthHeader();
      console.log(`요청 URL: ${baseURL}/book`);
      console.log("요청 헤더:", headers);

      const response = await axios.get(`${baseURL}/book`, {
        headers,
      });

      console.log("도서 목록 조회 성공:", response.data);
      return response;
    } catch (error) {
      console.error("도서 목록 조회 실패:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        requestHeaders: error.config?.headers,
        requestURL: error.config?.url,
      });
      throw error;
    }
  },

  // 도서 상세 조회
  getBookDetail: async (bookId) => {
    try {
      console.log(`도서 상세 조회 시작 - ID: ${bookId}`);
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/book/${bookId}`, {
        headers,
      });
      console.log("도서 상세 조회 성공:", response.data);
      return response;
    } catch (error) {
      console.error("도서 상세 조회 실패:", error);
      throw error;
    }
  },

  // 좋아요 생성
  createLike: async (bookId) => {
    try {
      console.log(`좋아요 생성 시작 - ID: ${bookId}`);
      const headers = getAuthHeader();
      const response = await axios.post(`${baseURL}/like/${bookId}`, null, {
        headers,
      });
      console.log("좋아요 생성 성공:", response.data);
      return response;
    } catch (error) {
      console.error("좋아요 생성 실패:", error);
      throw error;
    }
  },

  // 좋아요 취소
  deleteLike: async (bookId) => {
    try {
      console.log(`좋아요 취소 시작 - ID: ${bookId}`);
      const headers = getAuthHeader();
      const response = await axios.delete(`${baseURL}/like/${bookId}`, {
        headers,
      });
      console.log("좋아요 취소 성공:", response.data);
      return response;
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
      throw error;
    }
  },

  // E-북 읽기
  getBookPdf: async (bookId) => {
    try {
      console.log(`PDF 조회 시작 - ID: ${bookId}`);
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/book/pdf/${bookId}`, {
        headers,
        responseType: "blob",
      });
      console.log("PDF 조회 성공");
      return response;
    } catch (error) {
      console.error("PDF 조회 실패:", error);
      throw error;
    }
  },

  // 우편함 목록
  getLetters: async (bookId) => {
    try {
      console.log(`우편함 목록 조회 시작 - ID: ${bookId}`);
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/letter/${bookId}`, {
        headers,
      });
      console.log("우편함 목록 조회 성공:", response.data);
      return response;
    } catch (error) {
      console.error("우편함 목록 조회 실패:", error);
      throw error;
    }
  },
};
