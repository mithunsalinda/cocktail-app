import { render, screen, fireEvent } from "@testing-library/react";
import RandomDrinks from "../RandomDrinks";
import { getRandomDrinks } from "@/actions/serverAction";

jest.mock("../../actions/serverAction");

describe("RandomDrinks", () => {
  beforeEach(() => {
    getRandomDrinks.mockResolvedValue([
      {
        id: "1",
        strDrinkThumb: "https://example.com/drink1.jpg",
        strCategory: "Category 1",
        href: "https://example.com/drink1",
        strDrink: "Drink 1",
        strAlcoholic: "Alcoholic",
      },
      {
        id: "2",
        strDrinkThumb: "https://example.com/drink2.jpg",
        strCategory: "Category 2",
        href: "https://example.com/drink2",
        strDrink: "Drink 2",
        strAlcoholic: "Non-Alcoholic",
      },
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", async () => {
    render(<RandomDrinks />);
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });

  it("displays the correct number of drinks when the data is loaded", async () => {
    render(<RandomDrinks />);
    const drink1 = await screen.findByText("Drink 1");
    const drink2 = await screen.findByText("Drink 2");
    expect(drink1).toBeInTheDocument();
    expect(drink2).toBeInTheDocument();
  });

  it("displays the loading skeleton when the data is being fetched", async () => {
    getRandomDrinks.mockResolvedValue(new Promise(() => {}));
    render(<RandomDrinks />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(5);
  });

  it("fetches new data when the Refresh button is clicked", async () => {
    render(<RandomDrinks />);
    const refreshButton = screen.getByText("Refresh");
    fireEvent.click(refreshButton);
    expect(getRandomDrinks).toHaveBeenCalledTimes(2);
  });
});