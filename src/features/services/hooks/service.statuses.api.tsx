import axiosClient from "@/axiosClient";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ServiceStatus {
  id: bigint;
  name: string;
  description: string;
  user_id: bigint;
  created_at: Date;
  updated_at: Date;
}
interface ServiceStatuses {
  data: ServiceStatus[];
}

const fetchServiceStatuses = async () => {
  const parsed = await axiosClient.get(`service-statuses`);
  return parsed.data;
};

const useServiceStatuses = () => {
  return useQuery<ServiceStatuses, Error>({
    queryKey: ["service-statuses"],
    queryFn: () => fetchServiceStatuses(),
  });
};

const createServiceStatus = async (
  values: ServiceStatus
): Promise<AxiosResponse<ServiceStatus>> => {
  const response = await axiosClient.post("service-statuses", values);
  return response;
};

const useCreateServiceStatus = (): UseMutationResult<
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
    mutationFn: (values) => createServiceStatus(values),
  };

  return useMutation(mutationConfig);
};

export { useServiceStatuses, useCreateServiceStatus };
