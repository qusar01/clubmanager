import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axiosInstance from '../../config/axiosInstance'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

// Mock window.location.href
delete window.location
window.location = { href: '', assign: vi.fn() }

describe('axiosInstance', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should have correct base URL', () => {
    expect(axiosInstance.defaults.baseURL).toBe('http://localhost:8080/api')
  })

  it('should add Authorization header when token exists', () => {
    mockLocalStorage.getItem.mockReturnValue('test-token')

    // Simulate request interceptor
    const config = { headers: {} }
    const requestInterceptor = axiosInstance.interceptors.request.handlers[0]
    
    if (requestInterceptor && requestInterceptor.fulfilled) {
      const modifiedConfig = requestInterceptor.fulfilled(config)
      expect(modifiedConfig.headers.Authorization).toBe('Bearer test-token')
    }
  })

  it('should not add Authorization header when token does not exist', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    // Simulate request interceptor
    const config = { headers: {} }
    const requestInterceptor = axiosInstance.interceptors.request.handlers[0]
    
    if (requestInterceptor && requestInterceptor.fulfilled) {
      const modifiedConfig = requestInterceptor.fulfilled(config)
      expect(modifiedConfig.headers.Authorization).toBeUndefined()
    }
  })

  it('should handle 401 responses by clearing localStorage and redirecting', () => {
    const mockResponse = {
      status: 401,
      data: { message: 'Unauthorized' }
    }

    // Simulate response interceptor error
    const responseInterceptor = axiosInstance.interceptors.response.handlers[0]
    
    if (responseInterceptor && responseInterceptor.rejected) {
      responseInterceptor.rejected({ response: mockResponse })
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('expiresIn')
      expect(window.location.href).toBe('/login')
    }
  })

  it('should return successful responses unchanged', async () => {
    const mockResponse = {
      status: 200,
      data: { message: 'Success' }
    }

    // Simulate response interceptor success
    const responseInterceptor = axiosInstance.interceptors.response.handlers[0]
    
    if (responseInterceptor && responseInterceptor.fulfilled) {
      const result = responseInterceptor.fulfilled(mockResponse)
      expect(result).toBe(mockResponse)
    }
  })
})