import axiosClient from "@/axiosClient";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ServiceProvider {
  id: bigint;
  name: string;
  description: string;
  user_id: bigint;
  created_at: Date;
  updated_at: Date;
}
interface ServiceProviders {
  data: ServiceProvider[];
}

const fetchServiceProviders = async () => {
  const parsed = await axiosClient.get(`service-providers`);
  return parsed.data;
};

const useServiceProviders = () => {
  return useQuery<ServiceProviders, Error>({
    queryKey: ["service-providers"],
    queryFn: () => fetchServiceProviders(),
  });
};

const createServiceProvider = async (
  values: ServiceProvider
): Promise<AxiosResponse<ServiceProvider>> => {
  const response = await axiosClient.post("service-providers", values);
  return response;
};

const useCreateServiceProvider = (): UseMutationResult<
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
    mutationFn: (values) => createServiceProvider(values),
  };

  return useMutation(mutationConfig);
};

export { useServiceProviders, useCreateServiceProvider };
