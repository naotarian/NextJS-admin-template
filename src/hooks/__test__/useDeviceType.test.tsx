import { renderHook, act } from '@testing-library/react'
import { useDeviceType } from '../useDeviceType'

describe('useDeviceType', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('default', () => {
    const { result } = renderHook(() => useDeviceType())
    expect(result.current).toBe('desktop')
  })

  test('desktop', () => {
    global.innerWidth = 1200
    const { result } = renderHook(() => useDeviceType())

    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe('desktop')
  })

  test('tablet', () => {
    global.innerWidth = 800
    const { result } = renderHook(() => useDeviceType())

    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe('tablet')
  })

  test('mobile', () => {
    global.innerWidth = 500
    const { result } = renderHook(() => useDeviceType())

    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe('mobile')
  })

  test('clean up', () => {
    const addEventListenerSpy = jest.spyOn(global, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(global, 'removeEventListener')

    const { unmount } = renderHook(() => useDeviceType())

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
