import {render, screen} from '@testing-library/react';
import Footer from './Footer';


describe('Home', () => {
    it('renders a heading', () => {
        render(<Footer/>);
        const heading = screen.getByText(/Привет! Как дела!/i);
        expect(heading).toBeInTheDocument();
    });
});
