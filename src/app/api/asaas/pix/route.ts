// app/api/asaas/pix/route.ts
import { asaasClient } from '@/lib/asaasClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validação rigorosa
    if (!body.customer || typeof body.customer !== 'string') {
      throw new Error('ID do cliente inválido ou não informado');
    }

    const value = parseFloat(body.value);
    if (isNaN(value) || value <= 0) {
      throw new Error('Valor do pagamento inválido');
    }

    const paymentData = {
      customer: body.customer,
      billingType: 'PIX',
      value: value,
      dueDate: body.dueDate || new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0], // +3 dias
      description: body.description || 'Pagamento via PIX',
      externalReference: body.externalReference || undefined
    };

    console.log('Enviando para Asaas:', paymentData);
    
    const payment = await asaasClient.createPixPayment(paymentData);
    const qrCode = await asaasClient.getPixQrCode(payment.id);

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      qrCode: qrCode.encodedImage,
      payload: qrCode.payload,
      expirationDate: qrCode.expirationDate
    });

  } catch (error: any) {
    console.error('Erro detalhado:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: 'payment_error'
    }, { status: 500 });
  }
}