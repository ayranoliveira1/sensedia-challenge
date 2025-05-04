'use client'

import React, { useState, useMemo } from 'react'
import Search from './ui/search'
import Table from './ui/table'
import Pagination from './ui/pagination'

export type UserType = {
  id: string
  username: string
  name: string
  email: string
  city: string
  days: string
  posts: number
  albums: number
}

type UserTableProps = {
  users: UserType[]
}

const ITEMS_PER_PAGE = 8

export default function UserTable({ users }: UserTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
  }, [search, users])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredUsers, page])

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p)
  }

  return (
    <div className="py-4 bg-white rounded-md">
      <Search search={search} setPage={setPage} setSearch={setSearch} />

      <Table paginatedUsers={paginatedUsers} />

      <Pagination
        filteredUsers={filteredUsers}
        goToPage={goToPage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  )
}
