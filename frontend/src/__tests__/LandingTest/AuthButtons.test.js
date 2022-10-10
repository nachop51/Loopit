import { render as testRender, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AuthButtons } from "../../components/AuthButtons";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter, Routes } from "react-router-dom";

const render = (component) =>
  testRender(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );

describe("Renderizado y correcto funcionamiento del flujo de autenticación", () => {
  it("Debe existir un componente AuthButtons en el dom", () => {
    const { container } = render(<AuthButtons />);

    expect(container).toMatchSnapshot();
  });

  test("Ambos botones de autenticación deben encontrarse en la página", () => {
    render(<AuthButtons />);
    // screen.debug();
    // existencia de los botones
    const loginButton = screen.getByTestId("button-login");
    expect(loginButton).toBeInTheDocument();
    const registerButton = screen.getByTestId("button-register");
    expect(registerButton).toBeInTheDocument();
    // Tipo de etiqueta
    expect(loginButton.tagName).toBe("BUTTON");
    expect(registerButton.tagName).toBe("BUTTON");
    // contenido de los botones
    expect(loginButton).toHaveTextContent("Log In");
    expect(registerButton).toHaveTextContent("Sign Up");
  });
});
