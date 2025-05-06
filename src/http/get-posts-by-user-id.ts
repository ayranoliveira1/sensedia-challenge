'use server'

import { Posts } from './get-posts'

interface GetPostsByUserIdResponse {
  posts: Posts[]
}

export async function getPostsByUserId(
  id: string,
): Promise<GetPostsByUserIdResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}/posts`,
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
