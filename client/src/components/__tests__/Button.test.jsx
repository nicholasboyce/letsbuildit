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
});