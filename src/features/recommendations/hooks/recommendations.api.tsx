import axiosClient from "@/axiosClient"; // Ensure this path is correct
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Recommendation {
  item_id: string;
  predicted_rating: number;
}

interface AllRecommendations {
  [userId: string]: Recommendation[];
}

// Fetch all recommendations for all users
const fetchAllRecommendations = async (): Promise<AllRecommendations> => {
  const response = await axiosClient.get("/recommendations/recommendations");
  return response.data; // Ensure this matches the expected data format
};

// Use query for fetching all recommendations
const useAllRecommendations = (): UseQueryResult<AllRecommendations, Error> => {
  return useQuery<AllRecommendations, Error>({
    queryKey: ["allRecommendations"],
    queryFn: fetchAllRecommendations,
  });
};

export { useAllRecommendations };
