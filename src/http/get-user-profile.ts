'use server'

interface GetUsersResponse {
  name: string
  menu: {
    label: string
    route: string
  }[]
}

export const getUserProfile = async (): Promise<GetUsersResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user metadata')
  }

  const data = await res.json()

  return data
}
