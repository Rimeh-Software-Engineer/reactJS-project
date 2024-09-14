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
  newProduct: FormData
): Promise<AxiosResponse<Product>> => {
  return await axiosClient.post("/products", newProduct, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Use mutation for creating products
const useCreateProduct = (): UseMutationResult<
  AxiosResponse<Product>,
  Error,
  FormData
> => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Optionally invalidate and refetch products
    },
  });
};

// Delete a product by ID
const deleteProduct = async (id: string): Promise<AxiosResponse<void>> => {
  return await axiosClient.delete(`/products/${id}`);
};

// Use mutation for deleting products
const useDeleteProduct = (): UseMutationResult<
  AxiosResponse<void>,
  Error,
  string
> => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Optionally invalidate and refetch products
    },
  });
};

export { useProducts, useCreateProduct, useDeleteProduct };
