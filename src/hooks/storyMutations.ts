import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/stories";
const QUERY_KEY = ["stories"];

export function useAddStory(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await axios.post(BASE_URL, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thêm truyện thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Thêm truyện thất bại!");
    },
  });
}

export function useUpdateStoryMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: Record<string, unknown> }) => {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật truyện thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Cập nhật truyện thất bại!");
    },
  });
}
