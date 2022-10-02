import React from "react";
// import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import Footer from "../components/Footer/index.jsx";

describe("Logo renders correctly", () => {
  it("Debe existir un componente Footer en el dom", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // The following line is not needed, but it is useful to see the output
    console.log(container);
  });
});
