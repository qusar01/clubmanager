import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Login from '../../pages/Login'
import userReducer from '../../redux/slices/userSlice'
import axiosInstance from '../../config/axiosInstance'

// Mock axiosInstance
vi.mock('../../config/axiosInstance')

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock localStorage
const mockLocalStorage = {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

const createTestStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

const renderLogin = (store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )
}

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.setItem.mockClear()
    mockLocalStorage.getItem.mockClear()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should render login page with sign in card', () => {
    renderLogin()

    expect(screen.getByText('Club Manager')).toBeInTheDocument()
    expect(screen.getByText('zaloguj')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Hasło')).toBeInTheDocument()
  })

  it('should handle successful login for regular user', async () => {
    const mockLoginResponse = {
      data: {
        token: 'mock-jwt-token',
        expiresIn: 3600000,
      },
    }

    const mockUserResponse = {
      data: {
        id: 123,
        clubId: 456,
      },
    }

    const mockClubResponse = {
      data: {
        id: 456,
        isPaymentEnabled: true,
      },
    }

    axiosInstance.post.mockResolvedValueOnce(mockLoginResponse)
    axiosInstance.get
      .mockResolvedValueOnce(mockUserResponse)
      .mockResolvedValueOnce(mockClubResponse)

    const store = createTestStore()
    renderLogin(store)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      })
    })

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-jwt-token')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('expiresIn', expect.any(Number))
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    const state = store.getState()
    expect(state.user.userId).toBe(123)
    expect(state.user.clubId).toBe(456)
    expect(state.user.isPaymentEnabled).toBe(true)
  })

  it('should handle successful admin login', async () => {
    const mockLoginResponse = {
      data: {
        token: 'mock-admin-token',
        expiresIn: 3600000,
      },
    }

    axiosInstance.post.mockResolvedValueOnce(mockLoginResponse)

    renderLogin()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        email: 'admin',
        password: 'admin123',
      })
    })

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-admin-token')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    // Admin login should not fetch user/club data
    expect(axiosInstance.get).not.toHaveBeenCalled()
  })

  it('should handle login error', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    }

    axiosInstance.post.mockRejectedValueOnce(mockError)

    renderLogin()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalled()
    })

    // Should not navigate on error
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled()
  })

  it('should show loading state during login', async () => {
    // Create a promise that we can control
    let resolvePromise
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    axiosInstance.post.mockReturnValueOnce(pendingPromise)

    renderLogin()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    // Should show loading state
    await waitFor(() => {
      expect(submitButton).toHaveClass('loading')
      expect(submitButton).toBeDisabled()
    })

    // Resolve the promise to complete the test
    resolvePromise({
      data: {
        token: 'mock-token',
        expiresIn: 3600000,
      },
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should handle user without club', async () => {
    const mockLoginResponse = {
      data: {
        token: 'mock-jwt-token',
        expiresIn: 3600000,
      },
    }

    const mockUserResponse = {
      data: {
        id: 123,
        clubId: null, // No club associated
      },
    }

    const mockClubResponse = {
      data: {
        id: 789,
        isPaymentEnabled: false,
      },
    }

    axiosInstance.post.mockResolvedValueOnce(mockLoginResponse)
    axiosInstance.get
      .mockResolvedValueOnce(mockUserResponse)
      .mockResolvedValueOnce(mockClubResponse)

    const store = createTestStore()
    renderLogin(store)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Hasło')
    const submitButton = screen.getByRole('button', { name: /zaloguj/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/users/me')
      expect(axiosInstance.get).toHaveBeenCalledWith('/clubs/users/123')
    })

    const state = store.getState()
    expect(state.user.userId).toBe(123)
    expect(state.user.clubId).toBe(789)
    expect(state.user.isPaymentEnabled).toBe(false)
  })
})