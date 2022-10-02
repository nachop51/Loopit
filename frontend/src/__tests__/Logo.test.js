// import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { App } from "../components/App";

describe("Logo renders correctly", () => {
  it("Debe existir un componente img en el dom", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();

    // The following line is not needed, but it is useful to see the output
    console.log(container);
  });
});
