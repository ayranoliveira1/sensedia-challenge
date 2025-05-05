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

export function randomDays(): string[] {
  const randomDays = [...daysOfTheWeek].sort(() => Math.random() - 0.5)
  const numberOfDays = Math.floor(Math.random() * 7) + 1

  return randomDays.slice(0, numberOfDays).sort((a, b) => {
    return daysOfTheWeek.indexOf(a) - daysOfTheWeek.indexOf(b)
  })
}

export function randomCity(): string {
  const randomIndex = Math.floor(Math.random() * cities.length)
  return cities[randomIndex]
}

export function generateUserMetaData(user_id: string) {
  if (!userMetaData[user_id]) {
    const days = randomDays()
    const city = randomCity()

    userMetaData[user_id] = {
      days,
      city,
    }
  }

  return userMetaData[user_id]
}
