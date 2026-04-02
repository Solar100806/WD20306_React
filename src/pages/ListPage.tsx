import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Space } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/movies");
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/movies/${id}`);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Xóa thất bại");
    }
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      deleteMutation.mutate(id);
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/edit/${record.id}`}>
            <Button type="primary" className="bg-blue-500">Edit</Button>
          </Link>
          <Button 
            danger 
            onClick={() => handleDelete(record.id)}
            loading={deleteMutation.isPending && deleteMutation.context === record.id} // Or just basic loading
          >
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id" 
          loading={isLoading} 
        />
      </div>
    </div>
  );
}

export default ListPage;
