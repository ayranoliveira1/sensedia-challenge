'use server'

interface Posts {
  id: string
  content: string
  user_id: string
  updated_at: string
  created_at: string
}

interface GetPostsResponse {
  posts: Posts[]
}

export const getPosts = async (): Promise<GetPostsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  const data = await res.json()

  return {
    posts: data.posts,
  }
}
