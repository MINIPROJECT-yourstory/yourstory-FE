import axios from "axios";

const BASE_URL = "http://13.209.83.206:8080";

// 토큰을 가져오는 함수
const getToken = () => {
  return localStorage.getItem("accessToken"); // 또는 실제 토큰이 저장된 키 이름
};

export const volunteerApi = {
  // 봉사 목록 조회
  getVolunteerList: async (filters = {}) => {
    try {
      const { regions, recruitmentStatus, dayOfWeek } = filters;
      let url = `${BASE_URL}/work`;

      const params = new URLSearchParams();
      if (regions) params.append("regions", regions);
      if (recruitmentStatus)
        params.append("recruitmentStatus", recruitmentStatus);
      if (dayOfWeek) params.append("dayOfWeek", dayOfWeek);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // 토큰 추가
        },
      });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },

  // 봉사 상세 조회
  getVolunteerDetail: async (workId) => {
    try {
      const response = await axios.get(`${BASE_URL}/work/${workId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // 토큰 추가
        },
      });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },

  // 봉사 신청
  applyVolunteer: async (workId) => {
    const response = await axios.post(`${BASE_URL}/work/${workId}`);
    return response.data;
  },

  // 나의 봉사 현황
  getMyStatus: async () => {
    const response = await axios.get(`${BASE_URL}/work/my-status`);
    return response.data;
  },

  // 자서전 작성
  createRecord: async (recordData) => {
    const response = await axios.post(`${BASE_URL}/work/record`, recordData);
    return response.data;
  },

  // 자서전 상세 조회
  getRecordDetail: async (conditionId, date) => {
    const response = await axios.get(
      `${BASE_URL}/work/record/by-condition-and-date?conditionId=${conditionId}&date=${date}`
    );
    return response.data;
  },
};
