import { render, screen, fireEvent } from '@testing-library/react'
import Search from './search'

// Mock do ícone para simplificar os testes
jest.mock('react-icons/io', () => ({
  IoIosSearch: () => <span data-testid="search-icon">🔍</span>,
}))

describe('Search Component', () => {
  const mockSetSearch = jest.fn()
  const mockSetPage = jest.fn()
  const initialProps = {
    search: '',
    setSearch: mockSetSearch,
    setPage: mockSetPage,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<Search {...initialProps} />)

    expect(screen.getByPlaceholderText('Procurar')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('should update the search value and reset the page on input change', () => {
    render(<Search {...initialProps} />)

    const input = screen.getByPlaceholderText('Procurar')
    const testValue = 'teste'

    fireEvent.change(input, { target: { value: testValue } })

    expect(mockSetSearch).toHaveBeenCalledTimes(1)
    expect(mockSetSearch).toHaveBeenCalledWith(testValue)
    expect(mockSetPage).toHaveBeenCalledTimes(1)
    expect(mockSetPage).toHaveBeenCalledWith(1)
  })

  it('should display the current search value in the input', () => {
    const currentSearch = 'valor atual'
    render(<Search {...initialProps} search={currentSearch} />)

    const input = screen.getByPlaceholderText('Procurar') as HTMLInputElement
    expect(input.value).toBe(currentSearch)
  })

  it('should maintain the correct CSS classes', () => {
    render(<Search {...initialProps} />)

    const container = screen.getByTestId('search-container')
    const input = screen.getByPlaceholderText('Procurar')

    expect(container).toHaveClass('relative')
    expect(container).toHaveClass('mb-8')
    expect(input).toHaveClass(
      'w-full',
      'border-b-[2px]',
      'border-[#9E9E9E]',
      'bg-gray-100',
      'py-2',
      'pl-5',
      'text-sm',
      'focus:outline-none',
    )
  })
})
