import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const testId = 'spinner';

    render(<Spinner />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
