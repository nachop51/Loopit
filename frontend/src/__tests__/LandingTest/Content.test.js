import React from "react";
import { render as testRender } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Content from "../../components/Content/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";

const render = (component) => {
  testRender(<Router>{component} </Router>);
};

// TESTEO DE TODAS LAS SECCIONES DE CONTENIDO
describe("Renderizado correcto del contenedor del contenido", () => {
  it("Debe existir un componente Content en el dom", () => {
    render(<Content />);
    expect(render(<Content />)).toMatchSnapshot();
  });
});
