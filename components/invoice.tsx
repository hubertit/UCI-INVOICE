"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, FileText } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { formatCurrency } from "@/lib/currency-formatter"
import type { InvoiceData } from "@/types/invoice"

interface InvoiceProps {
  data: InvoiceData
}

export function Invoice({ data }: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (invoiceRef.current) {
      await generatePDF(invoiceRef.current, `Invoice-${data.invoiceNumber}`)
    }
  }

  const subtotal = data.totalAmount - data.vatAmount

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 print:hidden">
        <Button onClick={handleDownloadPDF} className="bg-gray-800 hover:bg-gray-900">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Invoice Content */}
      <Card className="overflow-hidden">
        <div ref={invoiceRef} className="bg-white">
          {/* Header */}
          <div className="bg-gray-800 text-white p-8">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <img
                  src="https://www.minisports.gov.rw/index.php?eID=dumpFile&t=f&f=1679&token=c456432515e20118795fbbd0cce379ac2bcd0a14"
                  alt="Ministry of Sports Logo"
                  className="w-16 h-16 object-contain bg-white rounded p-1"
                />
                <div>
                  <h1 className="text-2xl font-bold">MINISTRY OF SPORTS</h1>
                  <p className="text-gray-300">Republic of Rwanda</p>
                  <p className="text-gray-300">UCI KIGALI 2025</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white text-gray-800 px-4 py-2 rounded">
                  <FileText className="w-6 h-6 mx-auto mb-1" />
                  <p className="font-bold">INVOICE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill To:</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-800">
                    {data.customerInfo.firstName} {data.customerInfo.lastName}
                  </p>
                  {data.customerInfo.company && <p className="font-medium">{data.customerInfo.company}</p>}
                  <p>{data.customerInfo.email}</p>
                  <p>{data.customerInfo.phone}</p>
                  <p>{data.customerInfo.nationality}</p>
                  <p className="text-sm">{data.customerInfo.address}</p>
                  {data.customerInfo.vatNumber && <p className="text-sm">VAT: {data.customerInfo.vatNumber}</p>}
                </div>
              </div>

              <div className="text-right">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-semibold">{data.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Code:</span>
                    <span className="font-semibold">{data.orderCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Date:</span>
                    <span>{data.currentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span>{data.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="capitalize">{data.paymentMethod.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Items Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 font-semibold text-gray-700">Package</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Event Date</th>
                      <th className="text-center p-3 font-semibold text-gray-700">Qty</th>
                      <th className="text-right p-3 font-semibold text-gray-700">Unit Price</th>
                      <th className="text-right p-3 font-semibold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-800">{item.packageTitle}</p>
                            <p className="text-sm text-gray-500">ID: {item.packageId}</p>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{item.date}</td>
                        <td className="p-3 text-center">{item.quantity}</td>
                        <td className="p-3 text-right">{formatCurrency(item.price, item.currency)}</td>
                        <td className="p-3 text-right font-medium">
                          {formatCurrency(item.price * item.quantity, item.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Separator />

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal, data.currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (18%):</span>
                  <span>{formatCurrency(data.vatAmount, data.currency)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(data.totalAmount, data.currency)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Bank Transfer Details:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Bank:</span> Bank of Kigali
                    </p>
                    <p>
                      <span className="font-medium">Account Name:</span> Ministry of Sports - ETIKE
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span> 00040-0694563-07
                    </p>
                    <p>
                      <span className="font-medium">SWIFT Code:</span> BKIGRWRW
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Payment Terms:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• Payment due within 30 days of invoice date</p>
                    <p>• Include invoice number in payment reference</p>
                    <p>• Confirmation will be sent upon payment receipt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Next Steps */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Terms & Next Steps</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>1. Please retain this invoice for your records</p>
                <p>2. Event tickets/confirmations will be sent after payment verification</p>
                <p>3. For any queries, contact us using the information below</p>
                <p>4. Cancellation policy applies as per terms and conditions</p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-800">Contact Information</p>
                  <p>Ministry of Sports</p>
                  <p>KG 17 Ave, Kigali/ AMAHORO Stadium</p>
                  <p>Email: ucikigali2025@etike.rw</p>
                  <p>Phone: +250 788 123 456</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Website</p>
                  <p>www.etike.rw</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Ministry of Sports - Republic of Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
