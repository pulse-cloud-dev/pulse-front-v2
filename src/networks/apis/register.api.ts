import { publicClient } from "@/networks/client";
import { NameDescription, CodeItem, ApiResponse } from "@/contracts/response/register/register.response.dto";

const categoryApiRouter = {
  educationLevel: "/mentoring/mento-create/education-level",
  educationStatus: "/mentoring/mento-create/education-status",
  roleLevel: "/mentoring/mento-create/role-level",
  categories: "/category",
  categoryItems: (categoryCode: string) => `/category/item-list/${categoryCode}`,
  passStatus: "/mentoring/mento-info/pass-status",
};

// 합격 상태 조회
const getPassStatus = async (): Promise<NameDescription[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.passStatus)) as ApiResponse<NameDescription[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch pass status:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// 학력 정보 조회
const getEducationLevels = async (): Promise<NameDescription[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.educationLevel)) as ApiResponse<NameDescription[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch education levels:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// 학력 상태 조회
const getEducationStatuses = async (): Promise<NameDescription[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.educationStatus)) as ApiResponse<NameDescription[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch education statuses:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// 직책 정보 조회
const getRoleLevels = async (): Promise<NameDescription[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.roleLevel)) as ApiResponse<NameDescription[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch role levels:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// 카테고리 코드 조회
const getCategories = async (): Promise<CodeItem[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.categories)) as ApiResponse<CodeItem[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch categories:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// 카테고리 아이템 코드 조회
const getCategoryItems = async (categoryCode: string): Promise<CodeItem[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.categoryItems(categoryCode))) as ApiResponse<CodeItem[]>;
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error(`Failed to fetch category items for ${categoryCode}:`, error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

export const mentoringApis = {
  getEducationLevels,
  getEducationStatuses,
  getRoleLevels,
  getCategories,
  getCategoryItems,
  getPassStatus,
};
