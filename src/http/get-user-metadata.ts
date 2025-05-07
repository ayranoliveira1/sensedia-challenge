'use server'

import { UserMeta } from '@/lib/fake-database'

interface UserMetaData {
  user_id: string
  days: string[]
  city: string
  username: string
}

interface GetUsersResponse {
  users: UserMetaData[]
}

export const getUsersMetaData = async (): Promise<GetUsersResponse> => {
  const res = await fetch(`${process.env.FRONTEND_URL}/api/usermetadata`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user metadata')
  }

  const data = await res.json()

  return {
    users: data.map((user: UserMeta) => ({
      user_id: user.user_id,
      days: user.days || [],
      city: user.city || 'Unknown',
      username: user.username || 'Unknown',
    })),
  }
}
