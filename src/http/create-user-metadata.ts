'use server'

import { revalidatePath } from 'next/cache'

interface CreateUserMetaDataProps {
  user_id: string
  city: string
  days: string[]
}

export const createUserMetaData = async ({
  user_id,
  city,
  days,
}: CreateUserMetaDataProps) => {
  const res = await fetch(`http://localhost:3000/api/usermetadata`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, city, days }),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user metadata')
  }

  revalidatePath('/')

  return 'success'
}
