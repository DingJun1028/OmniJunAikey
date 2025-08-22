import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from './AuthButton';
import { useAuth } from '@/context/AuthContext';

// Mock the useAuth hook
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock;

describe('AuthButton', () => {
  it('should display loading state', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: true,
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    });

    render(<AuthButton />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display login button when logged out', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: false,
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    });

    render(<AuthButton />);
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  it('should display user info and logout button when logged in', () => {
    const mockUser = {
      displayName: 'Test User',
      photoURL: 'https://example.com/avatar.png',
    };
    mockedUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    });

    render(<AuthButton />);
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toHaveAttribute('src', mockUser.photoURL);
  });

  it('should call login function on click', () => {
    const loginMock = jest.fn();
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: false,
      loginWithGoogle: loginMock,
      logout: jest.fn(),
    });

    render(<AuthButton />);
    const loginButton = screen.getByText('Login with Google');
    fireEvent.click(loginButton);
    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  it('should call logout function on click', () => {
    const logoutMock = jest.fn();
    mockedUseAuth.mockReturnValue({
      user: { displayName: 'Test User' },
      loading: false,
      loginWithGoogle: jest.fn(),
      logout: logoutMock,
    });

    render(<AuthButton />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
