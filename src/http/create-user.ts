'use server'

import { revalidatePath } from 'next/cache'

export interface CreateUsersResponse {
  id: string
  name: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

export const createUser = async ({
  name,
  email,
}: CreateUserRequest): Promise<CreateUsersResponse | string> => {
  const password = process.env.PASSWORD

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    },
  )

  if (!res.ok) {
    return res.statusText.toString()
  }

  revalidatePath('/users')

  const data = await res.json()

  return {
    id: data.user.id,
    name: data.user.name,
  }
}
