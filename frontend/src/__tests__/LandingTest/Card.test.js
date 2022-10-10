import "@testing-library/jest-dom/extend-expect";
import Card from "../../components/Content/Card";
import { render, screen } from "@testing-library/react";

describe("Correcto renderizado y contenido de las tarjetas features", () => {
  test("Testeo de existencia", () => {
    render(<Card label="Hola" text="Lo mejor" />);

    const expectedLabel = "Hola";
    const expectedText = "Lo mejor";

    screen.debug();
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
