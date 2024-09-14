import axiosClient from "@/axiosClient";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Category {
  id: string;
  name: string;
}

// Fetch all categories
const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get("/categories");
  return response.data;
};

// Use query for fetching categories
const useCategories = (): UseQueryResult<Category[], Error> => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

// Create a new category
const createCategory = async (
  newCategory: Omit<Category, "id">
): Promise<AxiosResponse<Category>> => {
  return await axiosClient.post("/categories", newCategory);
};

// Use mutation for creating categories
const useCreateCategory = (): UseMutationResult<
  AxiosResponse<Category>,
  Error,
  Omit<Category, "id">
> => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Optionally invalidate and refetch categories
    },
  });
};

// Delete a category
const deleteCategory = async (categoryId: string): Promise<void> => {
  await axiosClient.delete(`/categories/${categoryId}`);
};

// Use mutation for deleting categories
const useDeleteCategory = (): UseMutationResult<void, Error, string> => {
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Optionally invalidate and refetch categories
    },
  });
};

// Update an existing category
const updateCategory = async (category: {
  id: string;
  name: string;
}): Promise<AxiosResponse<Category>> => {
  return await axiosClient.put(`/categories/${category.id}`, {
    name: category.name,
  });
};

// Use mutation for updating categories
const useUpdateCategory = (): UseMutationResult<
  AxiosResponse<Category>,
  Error,
  { id: string; name: string }
> => {
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      // Optionally invalidate and refetch categories
    },
  });
};

export {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
};
