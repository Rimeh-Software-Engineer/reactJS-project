import axiosClient from "@/axiosClient";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  productId: string;
  userId: string;
  expiredDate: string;
  is_active: boolean;
  created_at: string;
}

// Fetch all active offers
const fetchOffers = async (): Promise<Offer[]> => {
  const response = await axiosClient.get("/offers");
  return response.data;
};

// Fetch a single offer by ID
const fetchOfferById = async (id: string): Promise<Offer> => {
  const response = await axiosClient.get(`/offers/${id}`);
  return response.data;
};

// Create a new offer
const createOffer = async (
  newOffer: Omit<Offer, "id" | "created_at">
): Promise<Offer> => {
  const response = await axiosClient.post("/offers", newOffer);
  return response.data;
};

// Update an existing offer
const updateOffer = async (
  id: string,
  updatedOffer: Partial<Offer>
): Promise<Offer> => {
  const response = await axiosClient.put(`/offers/${id}`, updatedOffer);
  return response.data;
};

// Delete an offer
const deleteOffer = async (id: string): Promise<void> => {
  await axiosClient.delete(`/offers/${id}`);
};

// Hooks for offers
const useOffers = (): UseQueryResult<Offer[], Error> => {
  return useQuery<Offer[], Error>({
    queryKey: ["offers"],
    queryFn: fetchOffers,
  });
};

const useOfferById = (id: string): UseQueryResult<Offer, Error> => {
  return useQuery<Offer, Error>({
    queryKey: ["offer", id],
    queryFn: () => fetchOfferById(id),
  });
};

const useCreateOffer = (): UseMutationResult<
  Offer,
  Error,
  Omit<Offer, "id" | "created_at">
> => {
  return useMutation(createOffer);
};

const useUpdateOffer = (
  id: string
): UseMutationResult<Offer, Error, Partial<Offer>> => {
  return useMutation((updatedOffer) => updateOffer(id, updatedOffer));
};

const useDeleteOffer = (): UseMutationResult<void, Error, string> => {
  return useMutation(deleteOffer);
};

export {
  useOffers,
  useOfferById,
  useCreateOffer,
  useUpdateOffer,
  useDeleteOffer,
};
