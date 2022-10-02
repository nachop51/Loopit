import React from "react";
import { render } from "@testing-library/react";
import Footer from "../components/Footer/index.jsx";

describe("Footer renders correctly", () => {
  it("Debe existir un componente Footer en el dom", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // The following line is not needed, but it is useful to see the output
    console.log(container);
  });
});
