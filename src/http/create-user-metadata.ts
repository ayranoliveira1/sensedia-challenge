'use server'

import { revalidatePath } from 'next/cache'

interface CreateUserMetaDataProps {
  user_id: string
  username: string
  city: string
  days: string[]
}

export const createUserMetaData = async ({
  user_id,
  city,
  days,
  username,
}: CreateUserMetaDataProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/usermetadata`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, city, days, username }),
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch user metadata')
  }

  revalidatePath('/users')

  return 'success'
}
