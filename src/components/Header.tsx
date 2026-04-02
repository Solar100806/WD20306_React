import { Link } from "react-router-dom";
import { Avatar, Button, Tooltip } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { user, logout } = useUser();
  const { icon, toggleIcon } = useTheme();

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            textDecoration: "none",
          }}
        >
          🚀 WEB2091
        </Link>

        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Trang chủ", to: "/" },
            { label: "Danh sách", to: "/list" },
            { label: "Thêm mới", to: "/add" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Tooltip title={icon === "sun" ? "Đang hiện: Mặt trời" : "Đang hiện: Mặt trăng"}>
            <Button
              type="text"
              onClick={toggleIcon}
              style={{
                fontSize: 22,
                color: "#fff",
                padding: "4px 10px",
                lineHeight: 1,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2) rotate(20deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1) rotate(0deg)")
              }
            >
              {icon === "sun" ? "☀️" : "🌙"}
            </Button>
          </Tooltip>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar
                src={user.avatar}
                icon={!user.avatar ? <UserOutlined /> : undefined}
                size={36}
                style={{ border: "2px solid rgba(255,255,255,0.5)" }}
              />
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                {user.name}
              </span>
              <Tooltip title="Đăng xuất">
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  danger
                />
              </Tooltip>
            </div>
          ) : (
            <Link to="/login">
              <Button
                type="primary"
                ghost
                style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
