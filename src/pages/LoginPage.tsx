import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";

const { Title, Text } = Typography;

// Danh sách tài khoản giả lập – Bài 2
const FAKE_USERS = [
  {
    name: "Vũ Duy Hiếu",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NVA",
  },
  {
    name: "Vũ Thị Thuỳ Dương",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=TTB",
  },
  {
    name: "Vũ Duy Xuân",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=LMC",
  },
];

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [customName, setCustomName] = useState("");
  const [customAvatar, setCustomAvatar] = useState("");

  const handleLogin = (name: string, avatar: string) => {
    login({ name, avatar });
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "linear-gradient(135deg, #e0f0ff 0%, #f5f5ff 100%)",
      }}
    >
      <Card
        style={{ width: 420, borderRadius: 16 }}
        styles={{ body: { padding: 36 } }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔐</div>
          <Title level={3} style={{ margin: 0 }}>
            Đăng nhập giả lập
          </Title>
          <Text type="secondary">Chọn tài khoản hoặc nhập tùy chỉnh</Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {FAKE_USERS.map((u) => (
            <Button
              key={u.name}
              onClick={() => handleLogin(u.name, u.avatar)}
              style={{
                height: 56,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                padding: "0 16px",
              }}
            >
              <Avatar src={u.avatar} size={36} icon={<UserOutlined />} />
              <span style={{ fontWeight: 600, fontSize: 15 }}>{u.name}</span>
            </Button>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Text strong>Hoặc nhập tùy chỉnh:</Text>
          <Input
            placeholder="Tên của bạn"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            prefix={<UserOutlined />}
            style={{ borderRadius: 8 }}
          />
          <Input
            placeholder="URL Avatar (tùy chọn)"
            value={customAvatar}
            onChange={(e) => setCustomAvatar(e.target.value)}
            style={{ borderRadius: 8 }}
          />
          <Button
            type="primary"
            block
            disabled={!customName.trim()}
            onClick={() =>
              handleLogin(
                customName.trim(),
                customAvatar.trim() ||
                  `https://api.dicebear.com/9.x/adventurer/svg?seed=${customName}`
              )
            }
            style={{ height: 42, borderRadius: 8, fontWeight: 600 }}
          >
            Đăng nhập
          </Button>
        </div>
      </Card>
    </div>
  );
}
