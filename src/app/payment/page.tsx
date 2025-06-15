import { PixPaymentForm } from './components/PixPaymentForm'
import { BankTransferForm } from './components/BankTransferForm'

export default function PaymentPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Escolha sua forma de pagamento</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <PixPaymentForm />
        <BankTransferForm />
      </div>
    </div>
  )
}