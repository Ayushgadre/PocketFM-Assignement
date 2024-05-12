import { render, screen } from '@testing-library/react';
import MediaScreen from '@/components/MediaScreen';

// Describe block for the MediaScreen component tests
describe('MediaScreen component', () => {
  // Test to check if MediaScreen component renders without crashing
  test('renders MediaScreen component without crashing', () => {
    render(<MediaScreen />);
    // Check if the element with text "Audio/Video Player" is present
    const linkElement = screen.getByText(/Audio\/Video Player/i) as HTMLElement;
    expect(linkElement).toBeInTheDocument(); // Assertion to check if the element is in the document
  });

  // Test to check if "Upload a file or select from sample media" text is rendered
  test('renders "Upload a file or select from sample media" text', () => {
    render(<MediaScreen />);
    // Check if the element with the specified text is present
    const uploadText = screen.getByText(/Upload a file or select from sample media/i) as HTMLElement;
    expect(uploadText).toBeInTheDocument(); // Assertion to check if the element is in the document
  });

  // Test to check if "Video will be displayed here" text is rendered when no file is selected
  test('renders "Video will be displayed here" text when no file is selected', () => {
    render(<MediaScreen />);
    // Check if the element with the specified text is present
    const videoText = screen.getByText(/Video will be displayed here/i) as HTMLElement;
    expect(videoText).toBeInTheDocument(); // Assertion to check if the element is in the document
  });
});
