export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  address: string
  company?: string
  vatNumber?: string
}

export interface InvoiceItem {
  packageId: string
  packageTitle: string
  date: string
  price: number
  quantity: number
  currency: string
}

export interface InvoiceData {
  orderCode: string
  customerInfo: CustomerInfo
  items: InvoiceItem[]
  totalAmount: number
  vatAmount: number
  currency: string
  paymentMethod: string
  invoiceNumber: string
  currentDate: string
  dueDate: string
}
