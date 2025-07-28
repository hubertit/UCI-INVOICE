import type { InvoiceData } from "@/types/invoice"

export const sampleInvoiceData: InvoiceData = {
  orderCode: "ETK-3928469",
  customerInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+250788123456",
    nationality: "Rwanda",
    address: "123 Main St, Apt 4B, Kigali, Kigali 12345, Rwanda",
    company: "ABC Company Ltd",
    vatNumber: "VAT123456789",
  },
  items: [
    {
      packageId: "package_123",
      packageTitle: "Premium Ride Experience",
      date: "2025-09-20",
      price: 1500.0,
      quantity: 2,
      currency: "USD",
    },
    {
      packageId: "package_456",
      packageTitle: "Finish Line Lunch Package",
      date: "2025-09-22",
      price: 750.0,
      quantity: 1,
      currency: "USD",
    },
  ],
  totalAmount: 3750.0,
  vatAmount: 572.03,
  currency: "USD",
  paymentMethod: "bank-transfer",
  invoiceNumber: "INV-123456",
  currentDate: "December 20, 2024",
  dueDate: "January 19, 2025",
}
