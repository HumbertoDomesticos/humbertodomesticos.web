class AsaasClient {
      private apiKey: string
  private baseUrl: string

  constructor() {
    if (!process.env.ASAAS_API_KEY) {
      throw new Error('ASAAS_API_KEY is not defined in environment variables')
    }
    
    this.apiKey = process.env.ASAAS_API_KEY
    this.baseUrl = process.env.ASAAS_API_URL || 'https://www.asaas.com/api/v3'
  }

  private async request(endpoint: string, method: string, data?: any) {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'access_token': this.apiKey
      },
      body: data ? JSON.stringify(data) : undefined
    })

    if (!response.ok) {
      throw new Error(`Asaas API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Métodos para PIX
  async createPixPayment(paymentData: any) {
    return this.request('/payments', 'POST', {
      ...paymentData,
      billingType: 'PIX'
    })
  }

  async getPixQrCode(paymentId: string) {
    return this.request(`/payments/${paymentId}/pixQrCode`, 'GET')
  }

  // Métodos para Transferência Bancária
  async createBankTransfer(paymentData: any) {
    return this.request('/transfers', 'POST', paymentData)
  }
}

export const asaasClient = new AsaasClient()