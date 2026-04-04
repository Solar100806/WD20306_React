import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Skeleton } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCRUDStory from "../hooks/useCRUDStory";

function EditPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy chi tiết truyện theo id
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Điền dữ liệu vào form khi đã load xong
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  // Lấy hàm update từ useCRUDStory
  const { update, isUpdating } = useCRUDStory();

  const onFinish = (values: Record<string, string>) => {
    update(id!, values);
    navigate("/list");
  };

  if (isLoading) return <div className="p-6"><Skeleton active /></div>;
  if (isError) return <div className="p-6 text-red-500">Lỗi khi tải dữ liệu</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa truyện</h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        disabled={isUpdating}
      >
        <Form.Item
          label="Tên truyện"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tên truyện" }]}
        >
          <Input placeholder="Nhập tên truyện" />
        </Form.Item>

        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
        >
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" rows={3} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isUpdating}>
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}

export default EditPage;
