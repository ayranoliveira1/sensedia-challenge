import type { ReactNode } from 'react'

interface InfoBlockProps {
  icon: ReactNode
  title: string
  description: string
}

export default function InfoBlock({
  icon,
  title,
  description,
}: InfoBlockProps) {
  return (
    <div className="flex flex-col mt-10">
      <h3 className="text-lg font-medium text-[#8556AA] mb-2">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="rounded-full flex items-center justify-center text-[#8556AA] mr-4 flex-shrink-0">
          {icon}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
