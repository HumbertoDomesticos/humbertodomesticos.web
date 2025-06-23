import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    value,
    code,
    ownerName,
    cpfCnpj,
    agency,
    account,
    accountDigit,
    bankAccountType

  } = body;

  try {
    const response = await axios.post(
      'https://api-sandbox.asaas.com/v3/transfers',
      {
        value: value,
        bankAccount: {
          bank: { code: code },
          ownerName: ownerName,
          cpfCnpj: cpfCnpj,
          agency: agency,
          account: account,
          accountDigit: accountDigit,
          bankAccountType: bankAccountType // ✅ Adicionado!
        }
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const listarTransferencias = await axios.get('https://api-sandbox.asaas.com/v3/transfers',
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      },
    )


    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Erro ao processar transferência:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Erro ao processar transferência', detail: error?.response?.data },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    const listarTransferencias = await axios.get('https://api-sandbox.asaas.com/v3/transfers',
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    },
  );

  return NextResponse.json(listarTransferencias.data);

}
