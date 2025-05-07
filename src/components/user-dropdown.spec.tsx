import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserDropdown from './user-dropdown'

describe('UserDropdown Component', () => {
  const mockOptions = [
    { label: 'Lista de amigos', route: 'friends' },
    { label: 'Artigos salvos', route: 'saved' },
    { label: 'Notificações', route: 'notifications' },
    { label: 'Preferências', route: 'preferences' },
    { label: 'Fechar Sessão', route: 'logout' },
  ]

  const mockChildren = <span>User Menu</span>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the dropdown button with children', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should toggle dropdown visibility when button is clicked', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    const button = screen.getByRole('button')
    const menu = screen.getByRole('menu')

    expect(menu).toHaveClass('opacity-0')
    expect(menu).toHaveClass('pointer-events-none')

    fireEvent.click(button)
    expect(menu).toHaveClass('opacity-100')
    expect(menu).not.toHaveClass('opacity-0')
    expect(menu).not.toHaveClass('pointer-events-none')

    fireEvent.click(button)
    expect(menu).toHaveClass('opacity-0')
    expect(menu).toHaveClass('pointer-events-none')
  })

  it('should render all options when dropdown is open', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    fireEvent.click(screen.getByRole('button'))

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should close dropdown when clicking outside', () => {
    render(
      <div>
        <button>Outside Button</button>
        <UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>
      </div>,
    )

    fireEvent.click(screen.getByText('User Menu'))
    const menu = screen.getByRole('menu')
    expect(menu).toHaveClass('opacity-100')

    fireEvent.click(screen.getByText('Outside Button'))
    expect(menu).toHaveClass('opacity-0')
  })

  it('should close dropdown when pressing Escape key', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    fireEvent.click(screen.getByRole('button'))
    const menu = screen.getByRole('menu')
    expect(menu).toHaveClass('opacity-100')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(menu).toHaveClass('opacity-0')
  })

  it('should show hover indicator when hovering over options', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    fireEvent.click(screen.getByRole('button'))

    const firstOption = screen.getByText(mockOptions[0].label)
    fireEvent.mouseEnter(firstOption)

    const hoverIndicator = screen.getByTestId('hover-indicator')
    expect(hoverIndicator).toBeInTheDocument()
    expect(hoverIndicator).toHaveStyle('top: 0px')

    const secondOption = screen.getByText(mockOptions[1].label)
    fireEvent.mouseEnter(secondOption)
    expect(hoverIndicator).toHaveStyle('top: 36px')
  })

  it('should close dropdown when clicking on an option', () => {
    render(<UserDropdown options={mockOptions}>{mockChildren}</UserDropdown>)

    fireEvent.click(screen.getByRole('button'))
    const menu = screen.getByRole('menu')
    expect(menu).toHaveClass('opacity-100')

    fireEvent.click(screen.getByText(mockOptions[0].label))
    expect(menu).toHaveClass('opacity-0')
  })
})
