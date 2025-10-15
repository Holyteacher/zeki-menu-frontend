"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, CreditCard, AlertCircle } from "lucide-react"

export function SubscriptionsManager() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Subscriptions</h2>
        <p className="text-muted-foreground">Manage subscription plans and billing</p>
      </div>

      {/* Subscription Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">MRR</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">$48.2K</p>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              18%
            </Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Active</p>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">186</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Trial</p>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">62</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">3.2%</p>
        </Card>
      </div>

      {/* Plans Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Plans Distribution</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Starter", price: 49, subscribers: 82, revenue: 4018, color: "bg-blue-500" },
            { name: "Professional", price: 199, subscribers: 124, revenue: 24676, color: "bg-purple-500" },
            { name: "Business", price: 399, subscribers: 42, revenue: 16758, color: "bg-amber-500" },
          ].map((plan) => (
            <Card key={plan.name} className="p-6 border-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
                  <div className={`h-3 w-3 rounded-full ${plan.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">${plan.price}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subscribers</span>
                    <span className="font-semibold text-foreground">{plan.subscribers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Revenue</span>
                    <span className="font-semibold text-foreground">${plan.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            {
              restaurant: "Bella Italia",
              plan: "Professional",
              amount: 199,
              status: "success",
              date: "2 hours ago",
            },
            {
              restaurant: "Sushi Master",
              plan: "Business",
              amount: 399,
              status: "success",
              date: "5 hours ago",
            },
            {
              restaurant: "Ocean View",
              plan: "Professional",
              amount: 199,
              status: "failed",
              date: "1 day ago",
            },
            {
              restaurant: "Pizza Palace",
              plan: "Starter",
              amount: 49,
              status: "success",
              date: "1 day ago",
            },
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{transaction.restaurant}</p>
                <p className="text-sm text-muted-foreground">{transaction.plan} Plan</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">${transaction.amount}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={transaction.status === "success" ? "secondary" : "destructive"}>
                    {transaction.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{transaction.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
