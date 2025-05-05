'use server'

export interface Albums {
  id: string
  title: string
  description: string
  user_id: string
  updated_at: string
  created_at: string
}

interface GetAlbumsResponse {
  albums: Albums[]
}

export const getAlbums = async (): Promise<GetAlbumsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/albums`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch albums')
  }

  const data = await res.json()

  return {
    albums: data.albums,
  }
}
