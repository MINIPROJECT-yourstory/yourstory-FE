import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;
console.log("현재 baseURL:", baseURL);

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }
  // 토큰 만료 여부 체크 (JWT decode)
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    if (payload.exp * 1000 < Date.now()) {
      throw new Error("토큰이 만료되었습니다.");
    }
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    localStorage.removeItem("access"); // 잘못된 토큰 제거
    throw new Error("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
  }
  return token;
};

// 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log("생성된 헤더:", headers);
  return headers;
};

export const volunteerApi = {
  // 봉사 목록 조회
  getVolunteerList: async (filters = {}) => {
    try {
      console.log("봉사 목록 조회 시작");
      const { regions, recruitmentStatus, dayOfWeek } = filters;
      let url = `${baseURL}/work`;

      const params = new URLSearchParams();
      if (regions) params.append("regions", regions);
      if (recruitmentStatus)
        params.append("recruitmentStatus", recruitmentStatus);
      if (dayOfWeek) params.append("dayOfWeek", dayOfWeek);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const headers = getAuthHeader();
      const response = await axios.get(url, { headers });
      console.log("봉사 목록 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("봉사 목록 조회 실패:", error);
      throw error;
    }
  },

  // 봉사 상세 조회
  getVolunteerDetail: async (workId) => {
    try {
      console.log(`봉사 상세 조회 시작 - ID: ${workId}`);
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/work/${workId}`, {
        headers,
      });
      console.log("봉사 상세 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("봉사 상세 조회 실패:", error);
      throw error;
    }
  },

  // 봉사 신청
  applyVolunteer: async (workId) => {
    try {
      console.log(`봉사 신청 시작 - workId: ${workId}`);
      const headers = getAuthHeader();

      // 토큰에서 username 추출
      const token = localStorage.getItem("access");
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      const username = payload.username; // JWT 토큰에서 username 가져오기

      console.log("신청자 username:", username);

      const response = await axios.post(
        `${baseURL}/work/${workId}?username=${username}`, // URL에 username 파라미터 추가
        {},
        {
          headers,
          validateStatus: (status) => {
            console.log("응답 상태 코드:", status);
            return status >= 200 && status < 300;
          },
        }
      );

      console.log("신청 응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error("봉사 신청 에러 상세:");
      console.error("에러 상태:", error.response?.status);
      console.error("에러 데이터:", error.response?.data);

      if (error.response?.status === 403) {
        const errorMessage =
          error.response.data?.message ||
          "권한이 없거나 이미 신청된 봉사활동입니다.";
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  // 나의 봉사 현황
  getMyStatus: async () => {
    try {
      console.log("나의 봉사 현황 조회 시작");
      const headers = getAuthHeader();

      // 토큰에서 username 추출
      const token = localStorage.getItem("access");
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      const username = payload.username;

      console.log("조회 요청 username:", username);

      const response = await axios.get(
        `${baseURL}/work/my-status?username=${username}`,
        { headers }
      );

      console.log("봉사 현황 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("나의 봉사 현황 조회 실패:", error);
      console.error("에러 상태:", error.response?.status);
      console.error("에러 데이터:", error.response?.data);
      throw error;
    }
  },

  // 자서전 작성
  createRecord: async (recordData) => {
    try {
      console.log("자서전 작성 시작");
      const headers = getAuthHeader();
      const response = await axios.post(`${baseURL}/work/record`, recordData, {
        headers,
      });
      console.log("자서전 작성 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("자서전 작성 실패:", error);
      throw error;
    }
  },

  // 자서전 상세 조회
  getRecordDetail: async (conditionId, date) => {
    try {
      console.log(`자서전 상세 조회 시작 - ID: ${conditionId}, Date: ${date}`);
      const headers = getAuthHeader();
      const response = await axios.get(
        `${baseURL}/work/record/by-condition-and-date?conditionId=${conditionId}&date=${date}`,
        { headers }
      );
      console.log("자서전 상세 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("자서전 상세 조회 실패:", error);
      throw error;
    }
  },
};
