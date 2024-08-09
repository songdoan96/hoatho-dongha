export default interface UserType {
  username: string;
  password?: string;
  role: "PL" | "HT" | "KCS";
}
