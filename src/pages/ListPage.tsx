import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import useCRUDStory from "../hooks/useCRUDStory";

function ListPage() {
  const { list, isLoading, remove, isRemoving } = useCRUDStory();

  const handleDelete = (id: string | number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      remove(id);
    }
  };

  const columns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: unknown, record: { id: string | number }) => (
        <Space size="middle">
          <Link to={`/edit/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Button
            danger
            loading={isRemoving}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Danh sách truyện</h1>
        <Link to="/add">
          <Button type="primary">+ Thêm truyện</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
}

export default ListPage;
