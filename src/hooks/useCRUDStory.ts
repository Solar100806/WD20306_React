import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/stories";
const QUERY_KEY = ["stories"];

export interface Story {
  id: string | number;
  title: string;
  author: string;
  description?: string;
  [key: string]: unknown;
}

function useCRUDStory() {
  const queryClient = useQueryClient();

  const { data: list = [], isLoading } = useQuery<Story[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await axios.get(BASE_URL);
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newStory: Omit<Story, "id">) => {
      const res = await axios.post(BASE_URL, newStory);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thêm truyện thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      toast.error("Thêm truyện thất bại!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<Story>;
    }) => {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật truyện thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      toast.error("Cập nhật truyện thất bại!");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string | number) => {
      await axios.delete(`${BASE_URL}/${id}`);
    },
    onSuccess: () => {
      toast.success("Xóa truyện thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      toast.error("Xóa truyện thất bại!");
    },
  });

  const add = (story: Omit<Story, "id">) => addMutation.mutate(story);

  const update = (id: string | number, data: Partial<Story>) =>
    updateMutation.mutate({ id, data });

  const remove = (id: string | number) => removeMutation.mutate(id);

  return {
    list,
    isLoading,
    add,
    update,
    remove,

    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}

export default useCRUDStory;
