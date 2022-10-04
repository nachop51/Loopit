import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Content from "../../components/Content/index.jsx";

// TESTEO DE TODAS LAS SECCIONES DE CONTENIDO
describe("Renderizado correcto del contenedor del contenido", () => {
  it("Debe existir un componente Content en el dom", () => {
    const { container } = render(<Content />);
    expect(container).toMatchSnapshot();
  });
});
