'use server'

import { UserMeta } from '@/lib/fake-database'

interface User {
  user_id: string
  days: string[]
  city: string
}

interface GetUsersResponse {
  users: User[]
}

export const getUsersMetaData = async (): Promise<GetUsersResponse> => {
  const res = await fetch(`http://localhost:3000/api/usermetadata`, {
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
    })),
  }
}
