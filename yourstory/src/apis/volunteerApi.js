import axios from "axios";

const baseURL = process.env.REACT_APP_baseURL;

// 토큰을 가져오는 함수
const getToken = () => {
  return localStorage.getItem("accessToken"); // 또는 실제 토큰이 저장된 키 이름
};

export const volunteerApi = {
  // 봉사 목록 조회
  getVolunteerList: async (filters = {}) => {
    try {
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
      const response = await axios.get(`${baseURL}/work/${workId}`, {
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
    try {
      const response = await axios.post(`${baseURL}/work/${workId}`, null, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },

  // 나의 봉사 현황
  getMyStatus: async () => {
    try {
      const response = await axios.get(`${baseURL}/work/my-status`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },

  // 자서전 작성
  createRecord: async (recordData) => {
    try {
      const response = await axios.post(`${baseURL}/work/record`, recordData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },

  // 자서전 상세 조회
  getRecordDetail: async (conditionId, date) => {
    try {
      const response = await axios.get(
        `${baseURL}/work/record/by-condition-and-date?conditionId=${conditionId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  },
};
