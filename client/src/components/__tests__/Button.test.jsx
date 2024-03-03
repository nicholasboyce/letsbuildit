import Button from '../Button';
import { render, screen } from "@testing-library/react";
import { it, describe, expect } from 'vitest';


describe('Github button renders properly', () => {
    it('renders a button', () => {
        render(<Button />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has sign up text by default', () => {
        render(<Button />);
        expect(screen.getByRole('button').textContent).toMatch(/sign up with github/i);
    });

    it('has log in message when button is small', () => {
        render(<Button size="small" />);
        expect(screen.getByRole('button').textContent).toMatch(/log in with github/i);
    });

    it('prompts user to log out if user is signed in', () => {
        render(<Button signedIn />);
        expect(screen.getByRole('button').textContent).toMatch(/log out/i);
    });
});