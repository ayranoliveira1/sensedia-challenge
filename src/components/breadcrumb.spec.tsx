import { render, screen } from '@testing-library/react'
import Breadcrumb from './breadcrumb'
import { usePathname } from 'next/navigation'

// Mock do usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly for a simple URL', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/users')

    render(<Breadcrumb />)

    expect(screen.getByText('users')).toBeInTheDocument()

    expect(screen.getByText('users').tagName).toBe('SPAN')
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('should render multiple levels of breadcrumb', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/users/123/profile')

    render(<Breadcrumb />)

    expect(screen.getByText('users')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('profile')).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveTextContent('users')
    expect(links[1]).toHaveTextContent('123')

    expect(screen.getByText('profile').closest('span')).toBeInTheDocument()
    expect(screen.getByText('profile').closest('span')).toHaveClass(
      'font-semibold',
    )
  })

  it('should format labels correctly', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/user-management/new-user')

    render(<Breadcrumb />)

    expect(screen.getByText('user management')).toBeInTheDocument()
    expect(screen.getByText('new user')).toBeInTheDocument()
  })

  it('should replace "new" with "Registro" in the last item', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/users/new')

    render(<Breadcrumb />)

    expect(screen.getByText('users')).toBeInTheDocument()
    expect(screen.getByText('Registro')).toBeInTheDocument()
    expect(screen.queryByText('new')).toBeNull()

    // Verifica se "users" é link e "Registro" é span
    expect(screen.getByText('users').closest('a')).toBeInTheDocument()
    expect(screen.getByText('Registro').closest('span')).toBeInTheDocument()
  })

  it('should decode encoded URLs', () => {
    ;(usePathname as jest.Mock).mockReturnValue(
      '/categorias/tecnologia%20digital',
    )

    render(<Breadcrumb />)

    expect(screen.getByText('categorias')).toBeInTheDocument()
    expect(screen.getByText('tecnologia digital')).toBeInTheDocument()
  })
})
