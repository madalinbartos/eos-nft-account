import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders with correct placeholder text", () => {
    render(
      <SearchBar
        loading={false}
        query=""
        onQueryChange={() => {}}
        onSearchClick={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText("Enter account name")
    ).toBeInTheDocument();
  });

  test("calls onQueryChange when input value changes", () => {
    const handleQueryChange = jest.fn();
    render(
      <SearchBar
        loading={false}
        query=""
        onQueryChange={handleQueryChange}
        onSearchClick={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("Enter account name");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleQueryChange).toHaveBeenCalled();
  });

  test("calls onSearchClick when search button is clicked", async () => {
    const handleSearchClick = jest.fn();
    render(
      <SearchBar
        loading={false}
        query=""
        onQueryChange={() => {}}
        onSearchClick={handleSearchClick}
      />
    );
    const button = screen.getByText("Search NFTs");
    fireEvent.click(button);
    await waitFor(() => {
      expect(handleSearchClick).toHaveBeenCalled();
    });
  });

  test("disables input and button when loading", () => {
    render(
      <SearchBar
        loading={true}
        query=""
        onQueryChange={() => {}}
        onSearchClick={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("Enter account name");
    const button = screen.getByText("Loading...");
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
