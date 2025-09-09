import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SignInCard from '../../components/auth/SignInCard'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }
})

const renderSignInCard = (props = {}) => {
  const defaultProps = {
    submitLogin: vi.fn(),
    loading: false,
    errors: {},
    setErrors: vi.fn(),
    ...props,
  }

  return render(
    <BrowserRouter>
      <SignInCard {...defaultProps} />
    </BrowserRouter>
  )
}

describe('SignInCard', () => {
  let mockSubmitLogin
  let mockSetErrors

  beforeEach(() => {
    mockSubmitLogin = vi.fn()
    mockSetErrors = vi.fn()
  })

  it('should render login form elements', () => {
    renderSignInCard({ submitLogin: mockSubmitLogin, setErrors: mockSetErrors })

    expect(screen.getByText('Club Manager')).toBeInTheDocument()
    expect(screen.getByText('Zaloguj się')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Hasło')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /zaloguj/i })).toBeInTheDocument()
  })

  it('should handle email input change', () => {
    renderSignInCard({ submitLogin: mockSubmitLogin, setErrors: mockSetErrors })

    const emailInput = screen.getByPlaceholderText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput.value).toBe('test@example.com')
  })

  it('should handle password input change', () => {
    renderSignInCard({ submitLogin: mockSubmitLogin, setErrors: mockSetErrors })

    const passwordInput = screen.getByPlaceholderText('Hasło')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(passwordInput.value).toBe('password123')
  })

  it('should call submitLogin on form submission with correct data', async () => {
    renderSignInCard({ submitLogin: mockSubmitLogin, setErrors: mockSetErrors })

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitLogin).toHaveBeenCalledTimes(1)
      expect(mockSubmitLogin).toHaveBeenCalledWith(
        expect.any(Object),
        {
          email: 'test@example.com',
          password: 'password123',
        }
      )
    })
  })

  it('should show error styling when email error exists', () => {
    const errors = { email: 'Email is required' }
    renderSignInCard({ 
      submitLogin: mockSubmitLogin, 
      setErrors: mockSetErrors, 
      errors 
    })

    const emailLabel = screen.getByPlaceholderText('Email').closest('label')
    expect(emailLabel).toHaveClass('border-red-500', 'text-red-500')
  })

  it('should show error styling when password error exists', () => {
    const errors = { password: 'Password is required' }
    renderSignInCard({ 
      submitLogin: mockSubmitLogin, 
      setErrors: mockSetErrors, 
      errors 
    })

    const passwordLabel = screen.getByPlaceholderText('Hasło').closest('label')
    expect(passwordLabel).toHaveClass('border-red-500', 'text-red-500')
  })

  it('should display error messages when they exist', () => {
    const errors = { 
      email: 'Invalid email format',
      password: 'Password too short'
    }
    renderSignInCard({ 
      submitLogin: mockSubmitLogin, 
      setErrors: mockSetErrors, 
      errors 
    })

    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
    expect(screen.getByText('Password too short')).toBeInTheDocument()
  })

  it('should show loading state when loading is true', () => {
    renderSignInCard({ 
      submitLogin: mockSubmitLogin, 
      setErrors: mockSetErrors, 
      loading: true 
    })

    const submitButton = screen.getByRole('button', { name: /zaloguj/i })
    expect(submitButton).toHaveClass('loading')
    expect(submitButton).toBeDisabled()
  })

  it('should have links to register and forgot password pages', () => {
    renderSignInCard({ submitLogin: mockSubmitLogin, setErrors: mockSetErrors })

    expect(screen.getByText('Załóż konto')).toBeInTheDocument()
    expect(screen.getByText('Zresetuj hasło')).toBeInTheDocument()
  })

  it('should prevent form submission when loading', async () => {
    renderSignInCard({ 
      submitLogin: mockSubmitLogin, 
      setErrors: mockSetErrors, 
      loading: true 
    })

    const submitButton = screen.getByRole('button', { name: /zaloguj/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitLogin).not.toHaveBeenCalled()
    })
  })
})