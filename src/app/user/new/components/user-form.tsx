'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser, CreateUsersResponse } from '@/http/create-user'
import { toast } from 'sonner'
import { createUserMetaData } from '@/http/create-user-metadata'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  name: z.string().min(1, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  days: z
    .array(
      z.enum([
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ]),
    )
    .min(1, 'Selecione ao menos um dia'),
})

type FormData = z.infer<typeof schema>

const UserForm = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const route = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createUser({
        name: data.name,
        email: data.email,
      })

      if (res === 'Bad Request') {
        setError('email', { message: 'Este e-mail já está em uso!' })
        toast.error('Erro ao criar usuário. este e-mail já está em uso!')
        return
      }

      const { id } = res as CreateUsersResponse

      const userMetaData = {
        user_id: id,
        days: data.days,
        city: data.city,
        username: data.username,
      }

      console.log('userMetaData', userMetaData)

      const result = await createUserMetaData(userMetaData)

      if (result !== 'success') {
        toast.error('Erro ao criar metadados do usuário')
        return
      }

      reset()
      toast.success('Usuário criado com sucesso')

      route.push('/user')
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('Erro ao criar usuário')
    }
  }

  const daysOfTheWeek = [
    { value: 'Segunda', label: 'Seg' },
    { value: 'Terça', label: 'Ter' },
    { value: 'Quarta', label: 'Qua' },
    { value: 'Quinta', label: 'Qui' },
    { value: 'Sexta', label: 'Sex' },
    { value: 'Sábado', label: 'Sab' },
    { value: 'Domingo', label: 'Dom' },
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-6 w-full border rounded-lg"
    >
      <h2 className="text-lg font-semibold text-[#919191]">REGISTRO</h2>

      <div className="grid lg:grid-cols-2 lg:gap-4 gap-8 w-full mt-6">
        <div className="flex flex-col lg:gap-12 gap-8">
          <div>
            <input
              type="text"
              placeholder="Nome de usuário *"
              {...register('username')}
              className="w-full border-b-[2px] border-[#9E9E9E] bg-gray-100 py-2 pl-5 text-sm focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Nome completo *"
              {...register('name')}
              className="w-full border-b-[2px] border-[#9E9E9E] bg-gray-100 py-2 pl-5 text-sm focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="E-mail *"
              {...register('email')}
              className="w-full border-b-[2px] border-[#9E9E9E] bg-gray-100 py-2 pl-5 text-sm focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-12">
          <div>
            <input
              type="text"
              placeholder="Cidade *"
              {...register('city')}
              className="w-full border-b-[2px] border-[#9E9E9E] bg-gray-100 py-2 pl-5 text-sm focus:outline-none"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              DIAS DA SEMANA
            </label>
            <div className="flex flex-wrap gap-4">
              {daysOfTheWeek.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                >
                  <input
                    type="checkbox"
                    value={value}
                    {...register('days')}
                    className="accent-[#7E50CE] w-5 h-5 rounded"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            {errors.days && (
              <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 lg:mt-20">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 cursor-pointer lg:text-base text-sm text-white font-semibold px-6 py-2 rounded-full hover:bg-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'REGISTRAR'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="text-purple-700 font-semibold lg:text-base text-sm hover:bg-gray-200 px-6 py-2 rounded-full cursor-pointer"
        >
          CANCELAR
        </button>
      </div>
    </form>
  )
}

export default UserForm
