type Role = "user" | "admin";
type User = {
  id: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profileImage: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
type Post = {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};
type Comment = {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export { User, Post, Comment };
