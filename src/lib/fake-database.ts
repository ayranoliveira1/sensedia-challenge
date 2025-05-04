type UserMeta = {
  days: string[]
  city: string
}

const userMetaData: Record<string, UserMeta> = {}

export const daysOfTheWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

const cities = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
  'Fortaleza',
  'Recife',
  'Brasília',
  'Manaus',
  'Belém',
  'Goiânia',
  'Campinas',
  'São Luís',
  'Maceió',
  'Natal',
  'Teresina',
  'João Pessoa',
]

function getRandomDays(): string[] {
  const randomDays = [...daysOfTheWeek].sort(() => Math.random() - 0.5)
  const numberOfDays = Math.floor(Math.random() * 7) + 1

  return randomDays.slice(0, numberOfDays).sort((a, b) => {
    return daysOfTheWeek.indexOf(a) - daysOfTheWeek.indexOf(b)
  })
}

function getRandomCity(): string {
  const randomIndex = Math.floor(Math.random() * cities.length)
  return cities[randomIndex]
}

export function generateUserMetaData(user_id: string) {
  if (!userMetaData[user_id]) {
    const days = getRandomDays()
    const city = getRandomCity()

    userMetaData[user_id] = {
      days,
      city,
    }
  }

  return userMetaData[user_id]
}

export function getAllUserMetaData() {
  return Object.entries(userMetaData).map(([user_id, meta]) => ({
    user_id,
    ...meta,
  }))
}

export function createUserMetaData(user_id: string, data?: Partial<UserMeta>) {
  const days = data?.days || getRandomDays()
  const city = data?.city || getRandomCity()

  userMetaData[user_id] = {
    days,
    city,
  }

  return userMetaData[user_id]
}
