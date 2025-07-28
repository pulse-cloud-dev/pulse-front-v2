import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
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

export const useCategory = (categoryCode: string) => {
  return useSuspenseQuery({
    queryKey: ["categoryItemList", categoryCode],
    queryFn: () => mentoringApis.getCategories(categoryCode),
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCategoryItemList = (itemCode: string) => {
  return useSuspenseQuery({
    queryKey: ["categoryItemMetaList", itemCode],
    queryFn: () => mentoringApis.getCategoryItems(itemCode),
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

//ayn로 했지만 input값으로 받아야해
interface MutationCallbacks<TData = any, TError = Error> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export const useRegisterMentor = ({ onSuccess, onError }: MutationCallbacks = {}) => {
  return useMutation({
    mutationFn: mentoringApis.postRegisterMentor,
    onSuccess,
    onError,
  });
};
