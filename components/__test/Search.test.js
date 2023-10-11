import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

test("form onSubmit function is called when the form is submitted", () => {
  const formOnSubmit = jest.fn();
  const { getByPlaceholderText, getByTestId } = render(
    <Search formOnSubmit={formOnSubmit} />
  );

  const searchInput = getByPlaceholderText("Search questions");
  const submitButton = getByTestId("submit-button");

  fireEvent.change(searchInput, { target: { value: "test" } });
  fireEvent.click(submitButton);

  expect(formOnSubmit).toHaveBeenCalled();
});