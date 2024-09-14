import axiosClient from "@/axiosClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosClient.get<User[]>(`users`);
    console.log("API Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ensure errors are handled
  }
};

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export { useUsers };
