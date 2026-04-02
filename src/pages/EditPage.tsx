import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Skeleton } from "antd";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch movie details
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/movies/${id}`);
      return response.data;
    }
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const res = await axios.put(`http://localhost:3000/movies/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      navigate('/list');
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    }
  });

  const onFinish = (values: any) => {
    updateMutation.mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    toast.error("Vui lòng kiểm tra lại thông tin");
  };

  if (isLoading) return <div className="p-6"><Skeleton active /></div>;
  if (isError) return <div className="p-6 text-red-500">Lỗi khi tải dữ liệu</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật</h1>

      <Form 
        form={form} 
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} 
        layout="vertical" 
        className="space-y-6"
        disabled={updateMutation.isPending}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Vui lòng nhập title" }]}>
          <Input placeholder="Nhập tên phim" />
        </Form.Item>

        <Form.Item label="Tác giả" name="director" rules={[{required: true, message: "Vui lòng nhập tên tác giả"}]}>
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>

        <Form.Item label="Năm phát hành" name="year" rules={[{required: true, message: "Vui lòng nhập năm phát hành"}]}>
          <Input type="number" placeholder="Nhập năm phát hành"/>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={updateMutation.isPending}>
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;

