import axiosClient from "@/axiosClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
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

const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const response = await axiosClient.post<User>(`/users/register`, userData);
  return response.data;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users"]);
    },
  });
};

const updateUser = async (userData: User): Promise<User> => {
  const response = await axiosClient.put<User>(
    `/users/${userData.id}`,
    userData
  );
  return response.data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users"]);
    },
  });
};

const deleteUser = async (userId: string): Promise<void> => {
  console.log("Deleting user with ID:", userId); // Log the user ID
  await axiosClient.delete(`/users/${userId}`);
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      console.log("User deleted successfully"); // Log success
      queryClient.invalidateQueries(["users"]); // Refetch users
    },
    onError: (error) => {
      console.error("Error deleting user:", error); // Log errors
    },
  });
};

export { useUsers, useCreateUser, useUpdateUser, useDeleteUser };
