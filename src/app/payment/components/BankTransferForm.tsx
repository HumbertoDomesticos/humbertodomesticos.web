'use client'

import { useState } from 'react'

export function BankTransferForm() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [transferData, setTransferData] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/asaas/bank-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: parseFloat(value),
          bankAccount: {
            bank: '001', // Código do banco
            accountName: 'Nome do Titular',
            ownerName: 'Nome do Titular',
            cpfCnpj: '000.000.000-00',
            agency: '0000',
            account: '00000',
            accountDigit: '0'
          }
        })
      })

      const data = await response.json()
      setTransferData(data)
    } catch (error) {
      console.error(error)
      alert('Erro ao processar transferência')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Transferência Bancária</h2>
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
          {loading ? 'Processando...' : 'Solicitar Transferência'}
        </button>
      </form>

      {transferData && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Transferência solicitada com sucesso!</h3>
          <p>ID: {transferData.id}</p>
          <p>Status: {transferData.status}</p>
        </div>
      )}
    </div>
  )
}