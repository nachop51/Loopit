import "@testing-library/jest-dom/extend-expect";
import TitleAnimation from "../../../../components/Content/TitleAnimation";
import { render, screen } from "@testing-library/react";

describe("Correcto renderizado del titulo animado (features section heading)", () => {
  test("asddsa", () => {
    render(<TitleAnimation title="Welcome" width={7} />);
    // screen.debug();
    const expected = "Welcome";

    expect(screen.getByText(expected)).toBeInTheDocument();
    expect(expected.length).toBe(7);
  });
});
