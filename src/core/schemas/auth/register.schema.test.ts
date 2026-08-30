import { describe, expect, it } from "vitest";
import { signupSchema } from "./register.schema";

const validSignup = {
  fullName: "Joe Gutierrez",
  email: "joe@example.com",
  password: "Segura123",
  confirmPassword: "Segura123",
};

describe("signupSchema", () => {
  it("acepta un registro válido", () => {
    expect(signupSchema.safeParse(validSignup).success).toBe(true);
  });

  it("rechaza un correo inválido", () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      email: "correo-invalido",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza contraseñas con menos de ocho caracteres", () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: "1234567",
      confirmPassword: "1234567",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza contraseñas que no coinciden", () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      confirmPassword: "Diferente123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
        "Las contraseñas no coinciden"
      );
    }
  });
});
