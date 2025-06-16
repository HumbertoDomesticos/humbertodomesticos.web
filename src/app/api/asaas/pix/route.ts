// src/app/api/asaas/pix/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, cpfCnpj, value } = body;

  console.log('value: ', process.env.ASAAS_API_KEY);

  try {
    // 1. Criar cliente
    let cliente = await axios.post(
      'https://api-sandbox.asaas.com/v3/customers',
      {
        name: name, //name,
        email: email,
        cpfCnpj: cpfCnpj, //cpfCnpj,
        // value: value
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      }
    );

    console.log('cliente: ', cliente.status);

    const customer = await cliente.data;

    console.log("Cliente criado com sucesso:", customer);
    console.log("Iniciando criação do pagamento com cliente ID:", customer.id);

    // 2. Criar cobrança PIX
    const pagamento = await axios.post(
      `https://api-sandbox.asaas.com/v3/payments`,
      {
        customer: customer.id,
        billingType: 'PIX',
        value: value,
        // value: 1234.5,
        dueDate: new Date().toISOString().split('T')[0],
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
        },
      }
    );
    const pagamentoId = pagamento.data.id;

    // Agora busque o QR Code (feito pelo servidor, sem CORS)
    const qrCodeResponse = await axios.get(
      `https://api-sandbox.asaas.com/v3/payments/${pagamentoId}/pixQrCode`,
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
          accept: 'application/json',
        },
      }
    );

    return NextResponse.json({
      qrCode: {
        pixCopyPaste: qrCodeResponse.data.payload,
        pixQrCode: qrCodeResponse.data.encodedImage,
      },
      pagamentoId,
    });

  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: 'Erro ao gerar PIX' }, { status: 500 });
  }
}