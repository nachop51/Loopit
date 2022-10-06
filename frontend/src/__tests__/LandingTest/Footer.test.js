import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../../components/Footer/index.jsx";

describe("Footer renders correctly", () => {
  it("Debe existir un componente Footer en el dom", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // const footer = screen.getByTestId("footer");
    // The following line is not needed, but it is useful to see the output
    // console.log(container);p
  });

  test("En el footer debe existir cierto texto", () => {
    render(<Footer />);
    const fullMessage = screen.getByTestId("footer-heading");

    expect(fullMessage).toHaveTextContent("©Loopit 2022");
    expect(fullMessage).toBeInTheDocument();
  });
});
