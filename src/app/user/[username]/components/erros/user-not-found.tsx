import Link from 'next/link'

interface UserNotFoundErrorProps {
  errorTitle: string
  errorDescription: string
  errorList: string[]
}

const UserNotFound = ({
  errorTitle,
  errorDescription,
  errorList,
}: UserNotFoundErrorProps) => {
  return (
    <div className="flex flex-col items-center my-10 bg-white p-4 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="mb-5 text-4xl font-bold text-purple-800">
          {errorTitle}
        </h1>

        <p className="mb-3 text-lg text-gray-600">{errorDescription}</p>

        <p className="mb-6 text-[17px] text-gray-600">
          Isso pode ter acontecido porque:
        </p>

        <ul className="mb-8 space-y-2 text-left text-gray-600">
          {errorList.map((error, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-purple-600">•</span>
              {error}
            </li>
          ))}
        </ul>

        <Link
          href="/user"
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}

export default UserNotFound
