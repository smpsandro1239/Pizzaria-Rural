import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../components/Button";

describe("Componente Button", () => {
  it("deve renderizar o label corretamente", () => {
    const { getByText } = render(<Button label="Testar" onPress={() => {}} />);
    expect(getByText("Testar")).toBeTruthy();
  });

  it("deve chamar onPress ao ser clicado", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label="Clicar" onPress={onPressMock} />);
<<<<<<< HEAD

=======

>>>>>>> origin/main
    fireEvent.press(getByText("Clicar"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("deve mostrar o loader quando loading=true", () => {
    const { getByTestId } = render(<Button label="Testar" onPress={() => {}} loading />);
    expect(getByTestId("button-loader")).toBeTruthy();
  });
});
