import { describe, expect, it } from "vitest";
import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("acepta un correo y una contraseña válidos", () => {
    const result = loginSchema.safeParse({
      usernameOrEmail: "joe@example.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("acepta un nombre de usuario válido", () => {
    const result = loginSchema.safeParse({
      usernameOrEmail: "joe_gutierrez",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza un identificador con formato inválido", () => {
    const result = loginSchema.safeParse({
      usernameOrEmail: "joe gutierrez",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza contraseñas con menos de seis caracteres", () => {
    const result = loginSchema.safeParse({
      usernameOrEmail: "joe",
      password: "12345",
    });

    expect(result.success).toBe(false);
  });
});
