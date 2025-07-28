"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Invoice } from "@/components/invoice"
import { sampleInvoiceData } from "@/data/sample-data"

export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = useState(sampleInvoiceData)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Invoice Management System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Preview and download professional invoices for Ministry of Sports events.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => window.print()}>
                Print Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Invoice data={invoiceData} />
      </div>
    </div>
  )
}
