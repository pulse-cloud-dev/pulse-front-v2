import { useQuery } from "@tanstack/react-query";

import { userApis } from "@/networks";
import { SignUpRequestDTO } from "@/contracts";

const usejoinSocial = (domain:SignUpRequestDTO) => {
	const { refetch, data, isLoading, isError, error } = useQuery({
		queryKey:["socialSignUp"],
		queryFn: async () => {
      const res = await userApis.joinSocial(domain);
      return res;
    },
    enabled: false,
    refetchOnWindowFocus : false,
    retry:3
	})
  return { refetch, data, isLoading, isError, error };
};

export const signUpService = {
  usejoinSocial
};
