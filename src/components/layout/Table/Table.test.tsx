import { render, screen } from "@testing-library/react";
import Table from "./Table";
import {StaticRouter} from "react-router-dom/server";

describe("Table unit test", () => {
  it("should render books data", () => {
    // arrange
    const mockBooks = [{
      id: "1234",
     title: "some title",
      year: 2023,
     author:{name: "some author name", "id": "abcd"}
    }]

    // act
    render(<StaticRouter location={"/"}><Table books={mockBooks} /></StaticRouter>);
    const title = screen.getByText(mockBooks[0].title);
    const author = screen.getByText(mockBooks[0].author.name);
    const year = screen.getByText(mockBooks[0].year);
    const detailLink = screen.getByTestId("detail-link");
    const deleteButton = screen.getByRole("button");

    // assert
    expect(title).toBeVisible();
    expect(author).toBeVisible();
    expect(year).toBeVisible();
    expect(detailLink).toBeVisible();
    expect(detailLink).toHaveProperty("href","http://localhost/detail/" + mockBooks[0].id);
    expect(deleteButton).toBeVisible();
    expect(deleteButton).toHaveTextContent("Delete");
  })
});
