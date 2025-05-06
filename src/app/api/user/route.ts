import { NextResponse } from 'next/server'

export async function GET() {
  const user = {
    name: 'João da Silva',
    menu: [
      { label: 'Lista de amigos', route: 'friends' },
      { label: 'Artigos salvos', route: 'saved' },
      { label: 'Notificações', route: 'notifications' },
      { label: 'Preferências', route: 'preferences' },
      { label: 'Fechar Sessão', route: 'logout' },
    ],
  }

  return NextResponse.json(user)
}
