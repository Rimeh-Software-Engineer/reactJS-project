import axiosClient from "@/axiosClient";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  previousPrice: number;
  description: string;
  categoryId: string;
  image: string;
}

// Fetch all products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get("/products");
  return response.data;
};

// Use query for fetching products
const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

// Create a new product
const createProduct = async (
  newProduct: Omit<Product, "id">
): Promise<AxiosResponse<Product>> => {
  return await axiosClient.post("/products", newProduct);
};

// Use mutation for creating products
const useCreateProduct = (): UseMutationResult<
  AxiosResponse<Product>,
  Error,
  Omit<Product, "id">
> => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Optionally invalidate and refetch products
    },
  });
};

export { useProducts, useCreateProduct };
