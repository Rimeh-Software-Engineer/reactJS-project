import axiosClient from "@/axiosClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Comment {
  id: string;
  name: string;
  listingId: string;
  comment: string;
  pictureUrl: string;
}

// Function to fetch all comments
const fetchAllComments = async (): Promise<Comment[]> => {
  try {
    console.log("Fetching all comments");
    const response = await axiosClient.get<Comment[]>("/comments");
    console.log("Fetched all comments:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error; // Ensure errors are handled
  }
};

// Function to post a new comment
const postComment = async (
  newComment: Omit<Comment, "id">
): Promise<Comment> => {
  try {
    const response = await axiosClient.post<Comment>("/comments", newComment);
    console.log("API Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error; // Ensure errors are handled
  }
};

// Custom hook to use postComment
const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      // Invalidate the comments query to refetch data
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

const useAllComments = () => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: fetchAllComments,
  });
};

// Function to delete a comment by ID
const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axiosClient.delete(`/comments/${commentId}`);
    console.log("Deleted comment with ID:", commentId);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// Custom hook to use deleteComment
const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      // Invalidate the comments query to refetch data
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

export { usePostComment, useAllComments, useDeleteComment };
