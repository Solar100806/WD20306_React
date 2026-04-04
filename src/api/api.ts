// Dữ liệu cứng dùng để check
const mockUsers = [
  {
    id: "USR-1001",
    email: "admin@example.com",
    password: "password123",
    fullName: "Nguyen Van Admin",
    role: "ADMIN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
  {
    id: "USR-1002",
    email: "user@example.com",
    password: "password123",
    fullName: "Tran Thi Khach Hang",
    role: "USER",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  },
];

// Hàm gọi API giả lập
export const loginApiMock = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Tìm user trong mảng giả lập
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        // Nếu đúng, tách password ra để không trả về phía client
        const { password: _, ...userInfo } = user;

        // Trả về dữ liệu thành công
        resolve({
          status: 200,
          message: "Đăng nhập thành công!",
          data: {
            user: userInfo,
            accessToken: `mock-jwt-token-header.${btoa(userInfo.id)}.mock-signature-${Date.now()}`,
            refreshToken: `mock-refresh-token-${Date.now()}`,
          },
        });
      } else {
        // Trả về lỗi nếu sai email hoặc password
        reject({
          status: 401,
          message: "Email hoặc mật khẩu không chính xác!",
        });
      }
    }, 1000); // Delay 1 giây để thấy được loading state
  });
};
