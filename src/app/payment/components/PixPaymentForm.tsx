'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'

export function PixPaymentForm() {
  const [value, setValue] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentLink, setPaymentLink] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/asaas/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: 'cus_000000000000', // ID do cliente na Asaas
          value: parseFloat(value),
          dueDate: new Date().toISOString().split('T')[0]
        })
      })

      const data = await response.json()
      setQrCode(data.qrCode.encodedImage)
      setPaymentLink(data.qrCode.payload)
    } catch (error) {
      console.error(error)
      alert('Erro ao gerar PIX')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Pagamento via PIX</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Valor</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? 'Gerando...' : 'Gerar QR Code'}
        </button>
      </form>

      {qrCode && (
        <div className="mt-4 text-center">
          <QRCode value={paymentLink} size={200} />
          <p className="mt-2 text-sm">Escaneie o QR Code para pagar</p>
          <p className="mt-2 text-xs break-all">{paymentLink}</p>
        </div>
      )}
    </div>
  )
}