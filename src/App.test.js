import { render, screen } from '@testing-library/react';
import App from './App';

test('renders current experience and resume link', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Troy Wu' })).toBeInTheDocument();
  expect(screen.getByText('Amazon')).toBeInTheDocument();
  expect(screen.getAllByText(/Tesla/).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /resume/i })[0]).toHaveAttribute(
    'href',
    '/resume.pdf'
  );
});
