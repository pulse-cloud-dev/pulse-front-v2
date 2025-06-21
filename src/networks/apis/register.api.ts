import { publicClient } from "@/networks/client";
import { ApiResponse, NameDescription, CodeItem } from "@/contracts/response/register/register.response.dto";

const categoryApiRouter = {
  educationLevel: "/mentoring/mento-create/education-level",
  educationStatus: "/mentoring/mento-create/education-status",
  roleLevel: "/mentoring/mento-create/role-level",
  categories: "/category",
  categoryItems: (categoryCode: string) => `/category/item-list/${categoryCode}`,
};

// 학력 정보 조회
const getEducationLevels = async (): Promise<ApiResponse<NameDescription[]>> => {
  try {
    const response = await publicClient.get(categoryApiRouter.educationLevel);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch education levels:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};

// 학력 상태 조회
const getEducationStatuses = async (): Promise<ApiResponse<NameDescription[]>> => {
  try {
    const response = await publicClient.get(categoryApiRouter.educationStatus);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch education statuses:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};

// 직책 정보 조회
const getRoleLevels = async (): Promise<NameDescription[]> => {
  try {
    const response = await publicClient.get(categoryApiRouter.roleLevel);
    console.log("body", response);
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch role levels:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};

// 카테고리 코드 조회
const getCategories = async (): Promise<ApiResponse<CodeItem[]>> => {
  try {
    const response = await publicClient.get(categoryApiRouter.categories);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch categories:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};

// 카테고리 아이템 코드 조회
const getCategoryItems = async (categoryCode: string): Promise<ApiResponse<CodeItem[]>> => {
  try {
    const response = await publicClient.get(categoryApiRouter.categoryItems(categoryCode));
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`Failed to fetch category items for ${categoryCode}:`, error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};

export const mentoringApis = {
  getEducationLevels,
  getEducationStatuses,
  getRoleLevels,
  getCategories,
  getCategoryItems,
};
