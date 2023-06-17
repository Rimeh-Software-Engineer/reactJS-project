import axiosClient from "@/axiosClient";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ServiceSubscriptionType {
  id: bigint;
  name: string;
  description: string;
  user_id: bigint;
  created_at: Date;
  updated_at: Date;
}
interface ServiceSubscriptionTypes {
  data: ServiceSubscriptionType[];
}

const fetchServiceSubscriptionTypes = async () => {
  const parsed = await axiosClient.get(`service-subscription-types`);
  return parsed.data;
};

const useServiceSubscriptionTypes = () => {
  return useQuery<ServiceSubscriptionTypes, Error>({
    queryKey: ["service-subscription-types"],
    queryFn: () => fetchServiceSubscriptionTypes(),
  });
};

const createServiceSubscriptionType = async (
  values: ServiceSubscriptionType
): Promise<AxiosResponse<ServiceSubscriptionType>> => {
  const response = await axiosClient.post("service-subscription-types", values);
  return response;
};

const useCreateServiceSubscriptionType = (): UseMutationResult<
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
    mutationFn: (values) => createServiceSubscriptionType(values),
  };

  return useMutation(mutationConfig);
};

export { useServiceSubscriptionTypes, useCreateServiceSubscriptionType };
