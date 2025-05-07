import { formatDays } from '@/lib/format-days'
import { daysOfTheWeek } from '@/lib/generate-metatada'

describe('formatDays', () => {
  it('should return "Todos os dias" when receiving all days of the week', () => {
    expect(formatDays(daysOfTheWeek)).toBe('Todos os dias')
  })

  it('should return "Fim de semana" when receiving Saturday and Sunday', () => {
    expect(formatDays(['Sábado', 'Domingo'])).toBe('Fim de semana')
  })

  it('should return interval when days are consecutive', () => {
    expect(formatDays(['Segunda', 'Terça', 'Quarta'])).toBe('Segunda a Quarta')
  })

  it('should return two days separated by "e"', () => {
    expect(formatDays(['Segunda', 'Quarta'])).toBe('Segunda e Quarta')
  })

  it('should return list separated by commas when there are multiple non-consecutive days', () => {
    expect(formatDays(['Segunda', 'Quarta', 'Sexta'])).toBe(
      'Segunda, Quarta, Sexta',
    )
  })
})
