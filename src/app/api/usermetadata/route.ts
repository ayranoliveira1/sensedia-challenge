import { readUserMeta, UserMeta, writeUserMeta } from '@/lib/fake-database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const data = await readUserMeta()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, city, days } = body

    if (!user_id || !city || !Array.isArray(days)) {
      return NextResponse.json(
        {
          error:
            'Invalid input. Requires user_id (string), city (string), and days (array)',
        },
        { status: 400 },
      )
    }

    const currentData = await readUserMeta()

    const filteredData = currentData.filter(
      (user: UserMeta) => user.user_id !== user_id,
    )

    const updatedData = [
      ...filteredData,
      {
        user_id,
        city,
        days: [...days],
      },
    ]

    await writeUserMeta(updatedData)

    return NextResponse.json({
      success: true,
      user_id,
      action: currentData.some((user: UserMeta) => user.user_id === user_id)
        ? 'updated'
        : 'created',
    })
  } catch (error) {
    console.error('Error saving user metadata:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
