export default interface IUser {
  username: string;
  password: string;
  role: "admin" | "user";
}
