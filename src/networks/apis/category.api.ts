import axios from "axios";
import { publicClient } from "@/networks/client";

import type { CategoryItem, CategoryResponse} from "@/contracts/request/category/category.types";
import type { LectureType, LectureTypeResponse } from "@/contracts/request/category/lecture.types";
import type { RegionItem, RegionItemListResponse } from "@/contracts/request/category/region.types";
import type { MentoringListResponse, MentoringListParams } from "@/contracts/request/category/mentoring.types";
import type { MentoringDetail, MentoringDetailResponse } from "@/contracts/request/category/mentoringDetail";


// 분야 불러오기
const fieldItems = async (): Promise<CategoryItem[]> => {
  try {
    const data: { body: CategoryItem[] } = await publicClient.get("/category/item-list/JOB");
    return data.body;
  } catch (error) {
    console.error("직무직업 리스트 불러오기 실패:", error);
    throw error;
  }
};

// 상세 분야 불러오기
const subFields = async (jobCode: string): Promise<CategoryItem[]> => {
  try {
    const data: CategoryResponse = await publicClient.get(`/category/meta-list/${jobCode}`);
    return data.body;
  } catch (error) {
    console.error("상세 분야 리스트 불러오기 실패:", error);
    throw error;
  }
};


// 강의유형 - 온/오프라인
const lectureTypes = async (): Promise<LectureType[]> => {
  try {
    const data: LectureTypeResponse = await publicClient.get("/mentoring/lecture-type");
    return data.body;
  } catch (error) {
    console.error("강의 유형 불러오기 실패:", error);
    throw error;
  }
};

// 지역 불러오기
const regionItems = async (): Promise<RegionItem[]> => {
  try {
    const data: RegionItemListResponse = await publicClient.get("/category/item-list/REGION");
    return data.body;
  } catch (error) {
    console.error("시/도 리스트 불러오기 실패:", error);
    throw error;
  }
};

// 하위 행정구역 불러오기
const subRegions = async (regionCode: string): Promise<RegionItem[]> => {
  try {
    const data: RegionItemListResponse = await publicClient.get(`/category/meta-list/${regionCode}`);
    return data.body;
  } catch (error) {
    console.error("하위 행정구역 불러오기 실패:", error);
    throw error;
  }
};

// 필터링 api 연결
const getMentoringList = async (params: MentoringListParams) => {
  try {
    const data: MentoringListResponse = await publicClient.get("/mentoring/list", { params });
    return data.body;
  } catch (error) {
    console.error("멘토링 리스트 불러오기 실패:", error);
    throw error;
  }
};

const allSubFields = async (): Promise<{ parent: string; name: string; code: string }[]> => {
  const jobFields = await fieldItems(); // 상위 카테고리 목록

  // 모든 하위 항목을 병렬로 가져오기
  const result = await Promise.all(
    jobFields.map(async (field) => {
      try {
        const subItems = await subFields(field.code);
        return subItems.map((sub) => ({
          parent: field.name,
          name: sub.name,
          code: sub.code,
        }));
      } catch {
        return [];
      }
    })
  );

  return result.flat();
};


const allSubRegions = async (): Promise<{ parent: string; name: string; code: string }[]> => {
  const regions = await regionItems(); // 상위 지역 목록 (시/도 등)

  // 모든 하위 지역(시/군/구 등)을 병렬로 가져오기
  const result = await Promise.all(
    regions.map(async (region) => {
      try {
        const subItems = await subRegions(region.code); // 하위 행정구역 요청
        return subItems.map((sub) => ({
          parent: region.name,  // 상위 지역 이름
          name: sub.name,       // 하위 지역 이름
          code: sub.code,       // 고유 코드
        }));
      } catch {
        return [];
      }
    })
  );

  return result.flat();
};

// 멘토링 상세 조회
const getMentoringDetail = async (id: string): Promise<MentoringDetailResponse["body"]> => {
  try {
    const data: MentoringDetailResponse = await publicClient.get(`/mentoring/${id}`);
    return data.body;
  } catch (error) {
    console.error("멘토링 상세 조회 실패:", error);
    throw error;
  }
};

export const categoryApis = {
    fieldItems,
    subFields,
    lectureTypes,
    regionItems,
    subRegions,
    getMentoringList,
    allSubFields,
    allSubRegions,
    getMentoringDetail
};