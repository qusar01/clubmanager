import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from '../App'
import userReducer from '../redux/slices/userSlice'

// Mock axios
vi.mock('../config/axiosInstance')

// Mock components that might have issues
vi.mock('../components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}))

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}))

const createTestStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

const renderApp = (store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the App component', () => {
    renderApp()
    
    // App should render without crashing
    expect(document.body).toBeInTheDocument()
  })

  it('should provide Redux store to components', () => {
    const store = createTestStore()
    renderApp(store)
    
    // Should not throw any store-related errors
    expect(store.getState().user).toEqual({
      userId: null,
      clubId: null,
      isPaymentEnabled: false,
    })
  })
})