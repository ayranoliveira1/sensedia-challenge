import {
  generateUserMetaData,
  getAllUsersMetaData,
  randomCity,
  randomDays,
  randomUserName,
  daysOfTheWeek,
} from '../lib/generate-metatada'

describe('generateUserMetaData', () => {
  it('should generate consistent metadata for the same user_id', () => {
    const userId = '123'
    const meta1 = generateUserMetaData(userId)
    const meta2 = generateUserMetaData(userId)

    expect(meta1).toEqual(meta2)
    expect(meta1).toHaveProperty('days')
    expect(meta1).toHaveProperty('city')
    expect(meta1).toHaveProperty('username')
  })

  it('should include the user_id in getAllUsersMetaData()', () => {
    const userId = '456'
    generateUserMetaData(userId)
    const all = getAllUsersMetaData()
    const found = all.find((u) => u.user_id === userId)

    expect(found).toBeDefined()
    expect(found).toHaveProperty('city')
    expect(found).toHaveProperty('days')
    expect(found).toHaveProperty('username')
  })
})

describe('randomDays', () => {
  it('should return an array of unique weekdays between 1 and 7 elements', () => {
    const days = randomDays()
    const uniqueDays = new Set(days)

    expect(days.length).toBeGreaterThanOrEqual(1)
    expect(days.length).toBeLessThanOrEqual(7)
    expect(days.length).toBe(uniqueDays.size) // no duplicates
    days.forEach((day) => {
      expect(daysOfTheWeek).toContain(day)
    })
  })
})

describe('randomCity', () => {
  it('should return a string city name from known list', () => {
    const city = randomCity()
    expect(typeof city).toBe('string')
    expect(city.length).toBeGreaterThan(0)
  })
})

describe('randomUserName', () => {
  it('should return a non-empty string with a known suffix', () => {
    const username = randomUserName()
    expect(typeof username).toBe('string')
    expect(username.length).toBeGreaterThan(2)
  })
})
