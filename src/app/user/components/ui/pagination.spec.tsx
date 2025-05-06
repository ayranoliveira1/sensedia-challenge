import { render, screen, fireEvent } from '@testing-library/react'
import { UserType } from '../user-table'
import Pagination from './pagination'

describe('Pagination Component', () => {
  const mockUsers: UserType[] = Array(50).fill({
    id: '1',
    name: 'User',
    email: 'user@example.com',
  })

  const mockGoToPage = jest.fn()

  const renderPagination = (overrides = {}) => {
    const props = {
      page: 1,
      goToPage: mockGoToPage,
      filteredUsers: mockUsers,
      totalPages: 5,
      ...overrides,
    }
    return render(<Pagination {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display the total items and pagination controls', () => {
    renderPagination()

    expect(screen.getByText(/Total 50/)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByTestId('prev-button')).toBeInTheDocument()
    expect(screen.getByTestId('next-button')).toBeInTheDocument()
  })

  it('should allow navigation through numeric buttons', () => {
    renderPagination({ page: 3, totalPages: 5 })

    fireEvent.click(screen.getByTestId('page-button-2'))
    expect(mockGoToPage).toHaveBeenCalledWith(2)
  })

  it('should navigate to the previous and next page', () => {
    renderPagination({ page: 2, totalPages: 5 })

    fireEvent.click(screen.getByTestId('prev-button'))
    expect(mockGoToPage).toHaveBeenCalledWith(1)

    fireEvent.click(screen.getByTestId('next-button'))
    expect(mockGoToPage).toHaveBeenCalledWith(3)
  })

  it('should disable Previous on the first page and Next on the last page', () => {
    const { rerender } = renderPagination({ page: 1 })
    expect(screen.getByTestId('prev-button')).toBeDisabled()

    rerender(
      <Pagination
        page={5}
        goToPage={mockGoToPage}
        filteredUsers={mockUsers}
        totalPages={5}
      />,
    )
    expect(screen.getByTestId('next-button')).toBeDisabled()
  })

  it('should allow selecting a page from the dropdown', () => {
    renderPagination({ totalPages: 5 })

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '3' } })
    expect(mockGoToPage).toHaveBeenCalledWith(3)
  })

  it('should highlight the current page visually', () => {
    renderPagination({ page: 2 })

    const activeButton = screen.getByTestId('page-button-2')
    expect(activeButton).toHaveClass('bg-[#9E9E9E]')
    expect(activeButton).toHaveClass('text-white')
  })

  it('should show ellipsis when there are many pages', () => {
    renderPagination({ page: 4, totalPages: 10 })

    const ellipsisElements = screen.getAllByText('...')
    expect(ellipsisElements.length).toBe(2)

    const selectOptions = screen.getAllByRole('option')
    expect(selectOptions[0]).toHaveValue('1')

    expect(selectOptions[selectOptions.length - 1]).toHaveValue('10')
  })

  it('should render correctly with less than 3 pages', () => {
    renderPagination({ totalPages: 2 })

    expect(screen.queryByText('...')).toBeNull()

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument()
    expect(screen.getByTestId('page-button-2')).toBeInTheDocument()

    const selectOptions = screen.getAllByRole('option')
    expect(selectOptions).toHaveLength(2)
    expect(selectOptions[0]).toHaveValue('1')
    expect(selectOptions[1]).toHaveValue('2')
  })
})
