import { promises as fs } from 'fs'
import {
  readUserMeta,
  saveUsersMeta,
  UserMeta,
  writeUserMeta,
} from './fake-database'

jest.mock('fs', () => ({
  promises: {
    access: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}))

jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('/mocked/path/user-meta.json'),
}))

const mockUserMeta: UserMeta = {
  user_id: '123',
  days: ['monday', 'wednesday'],
  city: 'São Paulo',
  username: 'testuser',
}

describe('user-meta functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('readUserMeta', () => {
    it('should return empty array when file does not exist', async () => {
      ;(fs.access as jest.Mock).mockRejectedValue(new Error('File not found'))
      const result = await readUserMeta()
      expect(result).toEqual([])
    })

    it('should return empty array when file is empty', async () => {
      ;(fs.access as jest.Mock).mockResolvedValue(undefined)
      ;(fs.readFile as jest.Mock).mockResolvedValue('')
      const result = await readUserMeta()
      expect(result).toEqual([])
    })

    it('should return parsed data when file exists and has content', async () => {
      const mockData = JSON.stringify([mockUserMeta])
      ;(fs.access as jest.Mock).mockResolvedValue(undefined)
      ;(fs.readFile as jest.Mock).mockResolvedValue(mockData)
      const result = await readUserMeta()
      expect(result).toEqual([mockUserMeta])
    })
  })

  describe('writeUserMeta', () => {
    it('should write data to file', async () => {
      await writeUserMeta([mockUserMeta])
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mocked/path/user-meta.json',
        JSON.stringify([mockUserMeta], null, 2),
        'utf8',
      )
    })
  })

  describe('saveUsersMeta', () => {
    it('should merge new data with existing data', async () => {
      const existingData: UserMeta[] = [mockUserMeta]
      const newData: UserMeta[] = [
        {
          user_id: '456',
          days: ['friday'],
          city: 'Rio de Janeiro',
          username: 'newuser',
        },
      ]

      ;(fs.access as jest.Mock).mockResolvedValue(undefined)
      ;(fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(existingData),
      )

      await saveUsersMeta(newData)

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mocked/path/user-meta.json',
        JSON.stringify([mockUserMeta, newData[0]], null, 2),
        'utf8',
      )
    })

    it('should not duplicate existing users', async () => {
      const existingData: UserMeta[] = [mockUserMeta]
      const newData: UserMeta[] = [
        {
          ...mockUserMeta,
          days: ['updated-day'], // trying to update existing user
        },
      ]

      ;(fs.access as jest.Mock).mockResolvedValue(undefined)
      ;(fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(existingData),
      )

      await saveUsersMeta(newData)

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mocked/path/user-meta.json',
        JSON.stringify(existingData, null, 2),
        'utf8',
      )
    })

    it('should create new file with data when no existing file', async () => {
      ;(fs.access as jest.Mock).mockRejectedValue(new Error('File not found'))
      ;(fs.readFile as jest.Mock).mockResolvedValue('[]')

      await saveUsersMeta([mockUserMeta])

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mocked/path/user-meta.json',
        JSON.stringify([mockUserMeta], null, 2),
        'utf8',
      )
    })
  })
})
