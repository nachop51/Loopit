import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../../components/Footer/index.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Footer renders correctly", () => {
  it("Debe existir un componente Footer en el dom", () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();

    // const footer = screen.getByTestId("footer");
    // The following line is not needed, but it is useful to see the output
    // console.log(container);p
  });

  test("En el footer debe existir cierto texto", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const fullMessage = screen.getByTestId("footer-heading");

    expect(fullMessage).toHaveTextContent("©Loopit 2022");
  });
});
