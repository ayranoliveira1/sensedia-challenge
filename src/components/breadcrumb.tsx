'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaCaretRight } from 'react-icons/fa'

export default function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = decodeURIComponent(segment).replace(/-/g, ' ')
    return { href, label }
  })

  return (
    <nav className="text-sm text-gray-600 my-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            <FaCaretRight className="size-3 text-gray-300 mb-[2px]" />
            {i === breadcrumbs.length - 1 ? (
              <span className="font-semibold capitalize lg:text-sm text-xs text-gray-900">
                {crumb.label === 'new' ? 'Registro' : crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:underline capitalize lg:text-sm text-xs text-[#7E50CE]"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
