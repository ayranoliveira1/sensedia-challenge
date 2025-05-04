import { daysOfTheWeek } from './fake-database'

export function formatDays(days: string[]): string {
  const orderedDays = daysOfTheWeek
    .map((day, index) => ({ day, index }))
    .filter(({ day }) => days.includes(day))

  if (orderedDays.length === 7) return 'Todos os dias'

  const dayNames = orderedDays.map((d) => d.day)
  const dayIndices = orderedDays.map((d) => d.index).sort((a, b) => a - b)

  const isWeekend =
    dayNames.length === 2 &&
    dayNames.includes('Sábado') &&
    dayNames.includes('Domingo')

  if (isWeekend) return 'Fim de semana'

  const sequences: number[][] = []
  let currentSequence: number[] = []

  dayIndices.forEach((current, i) => {
    const previous = dayIndices[i - 1]
    const isSequential = i === 0 || current === previous + 1

    if (isSequential) {
      currentSequence.push(current)
    } else {
      sequences.push(currentSequence)
      currentSequence = [current]
    }
  })

  if (currentSequence.length) {
    sequences.push(currentSequence)
  }

  const isSingleSequence = sequences.length === 1 && sequences[0].length > 1
  if (isSingleSequence) {
    const [start, end] = sequences[0]
    return `${daysOfTheWeek[start]} a ${daysOfTheWeek[end]}`
  }

  if (dayNames.length === 2) {
    return `${dayNames[0]} e ${dayNames[1]}`
  }

  return dayNames.join(', ')
}
