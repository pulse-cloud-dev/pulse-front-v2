import axios from "axios";


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

export const categoryApis = {
    lectureTypes,
    regionItems,
    subRegions
};