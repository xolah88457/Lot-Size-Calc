"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function RiskCalculator() {
  const [riskAmount, setRiskAmount] = useState("")
  const [stopLoss, setStopLoss] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const calculateContracts = () => {
    setError("")

    try {
      const risk = Number.parseFloat(riskAmount)
      const stop = Number.parseFloat(stopLoss)

      if (isNaN(risk) || isNaN(stop)) {
        setError("Please enter valid numbers")
        return
      }

      if (risk <= 0) {
        setError("Risk amount must be greater than 0")
        return
      }

      if (stop <= 0) {
        setError("Stop loss must be greater than 0")
        return
      }

      // Formula: Contracts = Risk / (Stop Loss * 2)
      const contracts = risk / (stop * 2)
      setResult(`You can trade: ${contracts.toFixed(2)} contracts`)
    } catch (err) {
      setError("An error occurred during calculation")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Trading Contracts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="risk-amount">Enter Your Risk Amount ($)</Label>
          <Input
            id="risk-amount"
            type="number"
            placeholder="e.g., 100"
            value={riskAmount}
            onChange={(e) => setRiskAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stop-loss">Enter Your Stop Loss (points)</Label>
          <Input
            id="stop-loss"
            type="number"
            placeholder="e.g., 10"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={calculateContracts}>
          Calculate
        </Button>

        {result && <div className="text-center w-full font-bold text-lg">{result}</div>}
      </CardFooter>
    </Card>
  )
}

