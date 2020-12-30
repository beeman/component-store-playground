import { randomId } from '@component-store-playground/playground/workflows/util'

describe('randomId', () => {
  it('should return random id with default length 5', () => {
    const first = randomId()
    expect(first).toBeTruthy()
    expect(first).toHaveLength(5)

    const second = randomId()
    expect(second).toBeTruthy()
    expect(second).toHaveLength(5)
    expect(second).not.toEqual(first)
  })

  it('should return random id with custom size', () => {
    expect(randomId(6)).toHaveLength(6)
  })
})
