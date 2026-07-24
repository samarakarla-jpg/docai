type Credentials = {
  email: string;
  password: string;
};

type CredentialsValidation =
  | {
      data: Credentials;
      fieldErrors?: never;
      valid: true;
    }
  | {
      data?: never;
      fieldErrors: {
        email?: string;
        password?: string;
      };
      valid: false;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 128;

export function validateCredentials(formData: FormData): CredentialsValidation {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const fieldErrors: {
    email?: string;
    password?: string;
  } = {};

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Informe um e-mail válido.";
  }

  if (
    password.length < MINIMUM_PASSWORD_LENGTH ||
    password.length > MAXIMUM_PASSWORD_LENGTH
  ) {
    fieldErrors.password =
      "A senha deve ter entre 8 e 128 caracteres.";
  }

  if (fieldErrors.email || fieldErrors.password) {
    return { fieldErrors, valid: false };
  }

  return {
    data: {
      email: email.toLowerCase(),
      password,
    },
    valid: true,
  };
}
