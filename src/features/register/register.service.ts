import { useSuspenseQuery } from "@tanstack/react-query";
import { mentoringApis } from "@/networks/apis/register.api";

export const useEducationLevels = () =>
  useSuspenseQuery({
    queryKey: ["educationLevels"],
    queryFn: mentoringApis.getEducationLevels,
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const usePassStatus = () =>
  useSuspenseQuery({
    queryKey: ["pass-status"],
    queryFn: mentoringApis.getPassStatus,
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const useEducationStatuses = () =>
  useSuspenseQuery({
    queryKey: ["educationStatuses"],
    queryFn: mentoringApis.getEducationStatuses,
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
export const useRoleLevels = () => {
  return useSuspenseQuery({
    queryKey: ["roleLevels"],
    queryFn: mentoringApis.getRoleLevels,
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCategoryItemList = (categoryCode: string) => {
  return useSuspenseQuery({
    queryKey: ["categoryItemList", categoryCode],
    queryFn: () => mentoringApis.getCategoryItems(categoryCode),
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
