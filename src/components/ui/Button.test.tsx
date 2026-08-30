import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("muestra su contenido y ejecuta el evento de clic", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Guardar</Button>);

    const button = screen.getByRole("button", { name: "Guardar" });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-red-600");
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("no ejecuta el evento cuando está deshabilitado", () => {
    const handleClick = vi.fn();
    render(
      <Button
        disabled
        onClick={handleClick}
      >
        Guardar
      </Button>
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
