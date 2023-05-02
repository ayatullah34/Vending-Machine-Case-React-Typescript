import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from '../src/components/Header';

const mockChangeLanguage = jest.fn();

describe("Header component", () => {
  it("renders the title", () => {
    const { getByText } = render(<Header title="Vending Machine" changeLanguage={mockChangeLanguage} />);
    expect(getByText("Vending Machine")).toBeInTheDocument();
  });

  it("changes the language on button click", () => {
    const { getByAltText } = render(
      <Header title="Vending Machine" changeLanguage={mockChangeLanguage} />
    );

    const englishButton = getByAltText("English");
    const turkishButton = getByAltText("Türkçe");

    fireEvent.click(englishButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");

    fireEvent.click(turkishButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith("tr");
  });
});
