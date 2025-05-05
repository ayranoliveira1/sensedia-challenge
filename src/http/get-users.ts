'use server'

export interface User {
  id: string
  name: string
  email: string
  updated_at: string
  created_at: string
}

interface GetUsersResponse {
  users: User[]
}

export const getUsers = async (): Promise<GetUsersResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  const data = await res.json()

  return {
    users: data.users,
  }
}
