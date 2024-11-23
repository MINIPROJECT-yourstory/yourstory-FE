import axios from "axios";

const BASE_URL = "your_api_base_url";

export const volunteerApi = {
  // 봉사 목록 조회
  getVolunteerList: async (filters = {}) => {
    const { regions, recruitmentStatus, dayOfWeek } = filters;
    let url = `${BASE_URL}/work/list`;

    const params = new URLSearchParams();
    if (regions) params.append("regions", regions);
    if (recruitmentStatus)
      params.append("recruitmentStatus", recruitmentStatus);
    if (dayOfWeek) params.append("dayOfWeek", dayOfWeek);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
    return response.data;
  },

  // 봉사 상세 조회
  getVolunteerDetail: async (workId) => {
    const response = await axios.get(`${BASE_URL}/work/${workId}`);
    return response.data;
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
