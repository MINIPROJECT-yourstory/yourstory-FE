import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;
console.log("현재 baseURL:", baseURL);

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("access");
  console.log("가져온 토큰:", token);
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
      console.log(`봉사 신청 시작 - ID: ${workId}`);
      const headers = getAuthHeader();
      const response = await axios.post(`${baseURL}/work/${workId}`, null, {
        headers,
      });
      console.log("봉사 신청 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("봉사 신청 실패:", error);
      throw error;
    }
  },

  // 나의 봉사 현황
  getMyStatus: async () => {
    try {
      console.log("나의 봉사 현황 조회 시작");
      const headers = getAuthHeader();
      const response = await axios.get(`${baseURL}/work/my-status`, {
        headers,
      });
      console.log("나의 봉사 현황 조회 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("나의 봉사 현황 조회 실패:", error);
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
