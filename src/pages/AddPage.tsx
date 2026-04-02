import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('http://localhost:3000/movies', data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Thêm mới thành công");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      navigate('/list');
    },
    onError: () => {
      toast.error("Thêm mới thất bại")
    }
  })

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    toast.error("Vui lòng kiểm tra lại thông tin");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form 
        form={form} 
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} 
        layout="vertical" 
        className="space-y-6"
        disabled={mutation.isPending}
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

        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
