import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "../Login";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios"); // Mock axios globally

describe("Login Component", () => {
  it("renders login form", () => {
    render(
      <Router history={createMemoryHistory()}>
        <Login />
      </Router>
    );

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("triggers API call on form submission with valid input", async () => {
    // Mock axios post response
    axios.post.mockResolvedValueOnce({
      data: {
        user: { id: 1, name: "John Doe" },
        jwt_token: "dummy-token",
      },
    });

    const history = createMemoryHistory();
    jest.spyOn(history, "push");

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the API call to complete
    await waitFor(() => {
      // Verify that axios was called with the correct payload
      expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/login", {
        email: "test@example.com",
        password: "password123",
      });

      // Check if localStorage is updated
      expect(localStorage.getItem("token")).toBe("dummy-token");
      expect(JSON.parse(localStorage.getItem("user"))).toEqual({
        id: 1,
        name: "John Doe",
      });

      // Ensure the user is redirected
      expect(history.push).toHaveBeenCalledWith({
        pathname: "/feed",
        user: { id: 1, name: "John Doe" },
      });
    });
  });

  it("displays error message on invalid credentials", async () => {
    // Mock axios post response for invalid credentials
    axios.post.mockResolvedValueOnce({
      data: "Invalid credentials",
    });

    render(
      <Router history={createMemoryHistory()}>
        <Login />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Submit"));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
