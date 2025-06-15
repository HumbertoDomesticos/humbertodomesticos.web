import { NextResponse } from 'next/server'
import { asaasClient } from '@/lib/asaasClient'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.bankAccount || !body.value) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const transfer = await asaasClient.createBankTransfer(body)

    return NextResponse.json(transfer)
  } catch (error) {
    console.error('Erro ao processar transferência:', error)
    return NextResponse.json(
      { error: 'Erro ao processar transferência' },
      { status: 500 }
    )
  }
}