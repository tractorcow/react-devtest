import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("enables submit once name and email are provided", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submit = screen.getByRole("button", { name: /submit/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");

    expect(submit).toBeEnabled();
  });
});
