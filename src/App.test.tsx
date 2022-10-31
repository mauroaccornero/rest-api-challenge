import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App unit test", () => {
  it("should render layout and homepage components", () => {
    render(<App />);
    const header = screen.getByTestId("Header");
    const footer = screen.getByTestId("Footer");
    const homepage = screen.getByTestId("Homepage");

    expect(header).toBeVisible();
    expect(footer).toBeVisible();
    expect(homepage).toBeVisible();
  })
});
