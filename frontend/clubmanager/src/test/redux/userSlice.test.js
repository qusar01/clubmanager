import { describe, it, expect } from 'vitest'
import userReducer, {
  setUser,
  setUserId,
  setClubId,
  setIsPaymentEnabled,
  clearUser
} from '../../redux/slices/userSlice'

describe('userSlice', () => {
  const initialState = {
    userId: null,
    clubId: null,
    isPaymentEnabled: false,
  }

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle setUser', () => {
    const userData = {
      userId: 1,
      clubId: 2,
      isPaymentEnabled: true,
    }

    expect(userReducer(initialState, setUser(userData))).toEqual({
      userId: 1,
      clubId: 2,
      isPaymentEnabled: true,
    })
  })

  it('should handle setUserId', () => {
    expect(userReducer(initialState, setUserId(123))).toEqual({
      ...initialState,
      userId: 123,
    })
  })

  it('should handle setClubId', () => {
    expect(userReducer(initialState, setClubId(456))).toEqual({
      ...initialState,
      clubId: 456,
    })
  })

  it('should handle setIsPaymentEnabled', () => {
    expect(userReducer(initialState, setIsPaymentEnabled(true))).toEqual({
      ...initialState,
      isPaymentEnabled: true,
    })
  })

  it('should handle clearUser', () => {
    const stateWithData = {
      userId: 123,
      clubId: 456,
      isPaymentEnabled: true,
    }

    expect(userReducer(stateWithData, clearUser())).toEqual(initialState)
  })

  it('should handle multiple actions in sequence', () => {
    let state = initialState
    state = userReducer(state, setUserId(123))
    state = userReducer(state, setClubId(456))
    state = userReducer(state, setIsPaymentEnabled(true))

    expect(state).toEqual({
      userId: 123,
      clubId: 456,
      isPaymentEnabled: true,
    })

    state = userReducer(state, clearUser())
    expect(state).toEqual(initialState)
  })
})