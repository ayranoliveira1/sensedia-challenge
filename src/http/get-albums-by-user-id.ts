'use server'

import { Albums } from './get-albums'

interface GetAlbumsByUserIdResponse {
  albums: Albums[]
}

export async function getAlbumsByUserId(
  id: string,
): Promise<GetAlbumsByUserIdResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}/albums`,
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

  return data
}
