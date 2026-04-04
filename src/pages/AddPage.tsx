import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import useCRUDStory from "../hooks/useCRUDStory";

function AddPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { add, isAdding } = useCRUDStory();

  const onFinish = (values: Record<string, string>) => {
    add(values as any);
    form.resetFields();
    navigate("/list");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm truyện mới</h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        disabled={isAdding}
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

        <Button type="primary" htmlType="submit" loading={isAdding}>
          Thêm mới
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
