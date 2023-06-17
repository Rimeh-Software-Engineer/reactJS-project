import axiosClient from "@/axiosClient";
import { FileWithPath } from "@mantine/dropzone";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface Service {
  id: bigint;
  name: string;
  description: string;
  marketplace_id: bigint;
  service_provider_id: bigint;
  service_subscription_type_id: bigint;
  service_status_id: bigint;
  logo: FileWithPath[];
  created_at: Date;
  updated_at: Date;
}
interface Services {
  data: Service[];
}

const fetchServices = async () => {
  const parsed = await axiosClient.get(`services`);
  return parsed.data;
};

const useServices = () => {
  return useQuery<Services, Error>({
    queryKey: ["services"],
    queryFn: () => fetchServices(),
  });
};

const fetchService = async (serviceId: any) => {
  const parsed = await axiosClient.get(`services/${serviceId}`);
  return parsed.data;
};

const useGetService = (serviceId: any) => {
  return useQuery<Services, Error>({
    queryKey: ["services", serviceId],
    queryFn: () => fetchService(serviceId),
  });
};

const createService = async (
  values: Service
): Promise<AxiosResponse<Service>> => {
  const response = await axiosClient.post("services", values);
  return response;
};

const useCreateService = (): UseMutationResult<
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
    mutationFn: (values) => createService(values),
    onSuccess: () => {
      toast.success("Service Successfully Added");
    },
    onError() {
      toast.error("Verify Submitted Data");
    },
  };

  return useMutation(mutationConfig);
};

export { useServices, useCreateService, useGetService };
