// app/api/asaas/test/route.ts
import { asaasClient } from '@/lib/asaasClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await asaasClient.request('/customers?limit=1', 'GET');
    return NextResponse.json({ 
      success: true,
      apiStatus: 'Operacional',
      response: response 
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}