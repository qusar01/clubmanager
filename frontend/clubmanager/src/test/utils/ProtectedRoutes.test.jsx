import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoutes from '../../utils/ProtectedRoutes'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
  default: vi.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 3600, // Future expiration
    sub: 'user123'
  }))
}))

const TestComponent = () => <div data-testid="protected-content">Protected Content</div>

const renderProtectedRoutes = () => {
  return render(
    <BrowserRouter>
      <ProtectedRoutes>
        <TestComponent />
      </ProtectedRoutes>
    </BrowserRouter>
  )
}

describe('ProtectedRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children when user is authenticated with valid token', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'valid-jwt-token'
      if (key === 'expiresIn') return String(Date.now() + 3600000) // Future expiration
      return null
    })

    renderProtectedRoutes()

    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
  })

  it('should redirect to login when no token is present', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    renderProtectedRoutes()

    // Should not render protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('should redirect to login when token is expired', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'expired-jwt-token'
      if (key === 'expiresIn') return String(Date.now() - 3600000) // Past expiration
      return null
    })

    renderProtectedRoutes()

    // Should not render protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })
})