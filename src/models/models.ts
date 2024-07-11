type Role = "user" | "admin";
type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
type Post = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
type Comment = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export { User, Post, Comment };
