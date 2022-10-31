import { render, screen } from "@testing-library/react";
import Form from "./Form";
import {StaticRouter} from "react-router-dom/server";

describe("Form unit test", () => {
  it("should render book data", () => {
    // arrange
    const mockAuthors = [{id:"12312312", name:"sam john"},{id:"2324234",name:"paul john"}]
    const mockBook = {
      id: "1234",
      title: "some title",
      year: 2010,
     author: mockAuthors[1]
    }

    const submitMock = jest.fn()

    const mockButtonLabel = "something"

    // act
    render(<StaticRouter location={"/"}><Form
        book={mockBook}
        submitCallback={submitMock}
        authors={mockAuthors}
        buttonLabel={mockButtonLabel}
    /></StaticRouter>);

    const titleInput = screen.getByLabelText("Book title");
    const authorSelect = screen.getByLabelText("Book author");
    const yearSelect = screen.getByLabelText("Book year");
    const submitButton = screen.getByRole("button");

    // assert
    expect(titleInput).toBeVisible();
    expect(titleInput).toHaveValue(mockBook.title);
    expect(authorSelect).toBeVisible();
    expect(authorSelect).toHaveValue(mockBook.author.id);
    expect(yearSelect).toBeVisible();
    expect(yearSelect).toHaveValue(mockBook.year.toString());
    expect(submitButton).toBeVisible();
    expect(submitButton).toHaveTextContent(mockButtonLabel);
  })

  it("should render an empty form", () => {
    // arrange
    const mockAuthors = [{id:"12312312", name:"sam john"},{id:"2324234",name:"paul john"}]

    const submitMock = jest.fn()

    const mockButtonLabel = "something"

    // act
    render(<StaticRouter location={"/"}><Form
        submitCallback={submitMock}
        authors={mockAuthors}
        buttonLabel={mockButtonLabel}
    /></StaticRouter>);

    const titleInput = screen.getByLabelText("Book title");
    const authorSelect = screen.getByLabelText("Book author");
    const yearSelect = screen.getByLabelText("Book year");
    const submitButton = screen.getByRole("button");

    // assert
    expect(titleInput).toBeVisible();
    expect(titleInput).toHaveValue("");
    expect(authorSelect).toBeVisible();
    expect(authorSelect).toHaveValue("");
    expect(yearSelect).toBeVisible();
    expect(yearSelect).toHaveValue("0");
    expect(submitButton).toBeVisible();
    expect(submitButton).toHaveTextContent(mockButtonLabel);
  })
});
