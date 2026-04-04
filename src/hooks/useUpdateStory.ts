import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateStoryPayload {
  id: string | number;
  data: Record<string, unknown>;
}

function useUpdateStory() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: UpdateStoryPayload) => {
      const res = await axios.put(`http://localhost:3000/stories/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      toast.error("Cập nhật truyện thất bại!");
    },
  });

  return updateMutation;
}

export default useUpdateStory;
