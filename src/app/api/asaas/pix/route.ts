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
      `https://api-sandbox.asaas.com/v3/lean/payments`,
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

    console.log("pagamento: ", pagamento)
    const pagamentoId = pagamento.data.id;

    // const qrCode
    const qrCodeEstatico = await axios.post(
      `https://api-sandbox.asaas.com/v3/pix/qrCodes/static`,
      {
        addressKey: "06559674940",
        value: value,
        format: "All",
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY!,
        },
      }
    );

    console.log("qrCodeEstatico: ", qrCodeEstatico.data)
    // const pagamentoId = pagamento.data.id;


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
        pixCopyPaste: qrCodeEstatico.data.payload,
        pixQrCode: qrCodeEstatico.data.encodedImage,
      },
      pagamentoId,
    });

  } catch (error: any) {
    console.error("Erro completo ao gerar PIX:");
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.toJSON?.());
      console.error("Axios Response:", error.response?.data);
    } else {
      console.error("Erro desconhecido:", error);
    }

    return NextResponse.json(
      { error: 'Erro ao gerar PIX', details: error.response?.data || error.message },
      { status: 500 }
    );
  }

}

export async function GET(request: NextRequest) {
    const listarPix = await axios.get('https://api-sandbox.asaas.com/v3/lean/payments',
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    },
  );

  return NextResponse.json(listarPix.data);

}