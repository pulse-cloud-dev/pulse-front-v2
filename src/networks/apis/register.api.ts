import { privateClient, publicClient } from "@/networks/client";
import { NameDescription, CodeItem, ApiResponse } from "@/contracts/response/register/register.response.dto";
import { MentoInfoRequestDto } from "@/contracts";
const categoryApiRouter = {
  educationLevel: "/mento-info/education-level",
  educationStatus: "/mento-info/education-status",
  roleLevel: "/mento-info/role-level",
  categories: (categoryCode: string) => `/category/item-list/${categoryCode}`,
  categoryItems: (itemCode: string) => `/category/meta-list/${itemCode}`,
  passStatus: "/mento-info/pass-status",
  registerMentor: "/mento-info/register",
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
const getCategoryItems = async (itemCode: string): Promise<CodeItem[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.categoryItems(itemCode))) as ApiResponse<CodeItem[]>;
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
const getCategories = async (categoryCode: string): Promise<CodeItem[]> => {
  try {
    const response = (await publicClient.get(categoryApiRouter.categories(categoryCode))) as ApiResponse<CodeItem[]>;
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

const postRegisterMentor = async (MentoInfoRequestDto: MentoInfoRequestDto): Promise<CodeItem[]> => {
  try {
    const response = (await privateClient.post(categoryApiRouter.registerMentor, MentoInfoRequestDto)) as ApiResponse<CodeItem[]>;
    console.log(" response ", response);
    return response.body;
  } catch (error: any) {
    if (error.response) {
      console.error("에러 error.response.data");
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
  postRegisterMentor,
};
