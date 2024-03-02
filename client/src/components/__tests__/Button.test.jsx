import Button from '../Button';
import { render, screen } from "@testing-library/react";
import { it, describe, expect } from 'vitest';


describe('it renders properly', () => {
    it('renders a button', () => {
        render(<Button />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
});