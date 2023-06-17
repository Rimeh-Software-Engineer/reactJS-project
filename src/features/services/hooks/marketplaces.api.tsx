import axiosClient from "@/axiosClient";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Marketplace {
  id: bigint;
  name: string;
  description: string;
  website: string;
  logo: string;
  operator_id: bigint;
  created_at: Date;
  updated_at: Date;
}
interface Marketplaces {
  data: Marketplace[];
}

const fetchMarketplaces = async () => {
  const parsed = await axiosClient.get(`marketplaces`);
  return parsed.data;
};

const useMarketplaces = () => {
  return useQuery<Marketplaces, Error>({
    queryKey: ["marketplaces"],
    queryFn: () => fetchMarketplaces(),
  });
};

const createMarketplace = async (
  values: Marketplace
): Promise<AxiosResponse<Marketplace>> => {
  const response = await axiosClient.post("marketplaces", values);
  return response;
};

const useCreateMarketplace = (): UseMutationResult<
  AxiosResponse<any>,
  Error,
  any,
  unknown
> => {
  const mutationConfig: UseMutationOptions<
    AxiosResponse<any>,
    Error,
    any,
    unknown
  > = {
    mutationFn: (values) => createMarketplace(values),
  };

  return useMutation(mutationConfig);
};

export { useMarketplaces, useCreateMarketplace };
