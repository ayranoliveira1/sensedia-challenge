'use server'

import { revalidatePath } from 'next/cache'

export const deleteUser = async (user_id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to delete user')
  }

  revalidatePath('/users')

  const data = await res.json()

  return data
}
