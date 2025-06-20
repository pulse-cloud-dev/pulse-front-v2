import axios from "axios";

interface MentoringListParams {
  field?: string;
  lecture_type?: "ONLINE" | "OFFLINE";
  region?: string;
  sort_type?: "DEFAULT" | "POPULAR" | "LATEST";
  search_text?: string;
  page?: number;
  size?: number;
}

// 분야 불러오기
const fieldItems = async (): Promise<{ name: string; code: string }[]> => {
  try {
    const { data } = await axios.get(
      "/api/v1/category/item-list/JOB",
      { headers: { Accept: "application/json" } }
    );
    return data.body;
  } catch (error) {
    console.error("직무직업 리스트 불러오기 실패:", error);
    throw error;
  }
};

// 상세 분야 불러오기
const subFields = async (jobCode: string): Promise<{ name: string; code: string }[]> => {
  try {
    const { data } = await axios.get(
      `/api/v1/category/meta-list/${jobCode}`,
      { headers: { Accept: "application/json" } }
    );
    return data.body;
  } catch (error) {
    console.error("하위 행정구역 불러오기 실패:", error);
    throw error;
  }
};

// 강의유형 - 온/오프라인
const lectureTypes = async (): Promise<string[]> => {
  try {
    const { data } = await axios.get(
      "/api/v1/mentoring/lecture-type",
      {
        headers: { Accept: "application/json" },
      }
    );
    return data.body; // ['ONLINE', 'OFFLINE']
  } catch (error) {
    console.error("강의 유형 로딩 실패:", error);
    return [];
  }
};

// 지역 불러오기
const regionItems = async (): Promise<{ name: string; code: string }[]> => {
  try {
    const { data } = await axios.get(
      "/api/v1/category/item-list/REGION",
      { headers: { Accept: "application/json" } }
    );
    return data.body;
  } catch (error) {
    console.error("시/도 리스트 불러오기 실패:", error);
    throw error;
  }
};

// 하위 행정구역 불러오기
const subRegions = async (regionCode: string): Promise<{ name: string; code: string }[]> => {
  try {
    const { data } = await axios.get(
      `/api/v1/category/meta-list/${regionCode}`,
      { headers: { Accept: "application/json" } }
    );
    return data.body;
  } catch (error) {
    console.error("하위 행정구역 불러오기 실패:", error);
    throw error;
  }
};

// 필터링 api 연결
const getMentoringList = async (params: MentoringListParams) => {
  try {
    const { data } = await axios.get("/api/v1/mentoring/list", {
      headers: { Accept: "application/json" },
      params,
    });

    return data.body;
  } catch (error) {
    console.error("멘토링 리스트 불러오기 실패:", error);
    throw error;
  }
};

export const categoryApis = {
    fieldItems,
    subFields,
    lectureTypes,
    regionItems,
    subRegions,
    getMentoringList
};