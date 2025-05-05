'use server'

import { User } from './get-users'

interface GetUserByIdResponse {
  user: User
}

export async function getUserById(id: string): Promise<GetUserByIdResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await res.json()

  console.log('User data:', data)

  return data
}
