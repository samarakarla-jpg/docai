export type AuthActionState = {
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  message?: string;
  status: "idle" | "error" | "success";
};
