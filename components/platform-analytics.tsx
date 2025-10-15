"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp } from "lucide-react"

export function PlatformAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Platform Analytics</h2>
          <p className="text-muted-foreground">Track platform-wide performance metrics</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Growth Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Restaurant Growth</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Signups</span>
              <span className="font-semibold text-foreground">28</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Churned</span>
              <span className="font-semibold text-foreground">8</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium text-foreground">Net Growth</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-bold text-green-600">+20</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue Growth</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New MRR</span>
              <span className="font-semibold text-foreground">$8.4K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Churned MRR</span>
              <span className="font-semibold text-foreground">$1.2K</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium text-foreground">Net MRR</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-bold text-green-600">+$7.2K</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">User Engagement</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Daily Active</span>
              <span className="font-semibold text-foreground">1,248</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Weekly Active</span>
              <span className="font-semibold text-foreground">1,684</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium text-foreground">Engagement Rate</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-bold text-green-600">74%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing Restaurants */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Restaurants</h3>
        <div className="space-y-4">
          {[
            { name: "Sushi Master", orders: 2156, revenue: 48240, growth: "+24%" },
            { name: "Bella Italia", orders: 1842, revenue: 42180, growth: "+18%" },
            { name: "Ocean View", orders: 1624, revenue: 38920, growth: "+15%" },
            { name: "Steakhouse Prime", orders: 1486, revenue: 52840, growth: "+12%" },
            { name: "Pizza Palace", orders: 1328, revenue: 28640, growth: "+8%" },
          ].map((restaurant, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{restaurant.name}</p>
                  <p className="text-sm text-muted-foreground">{restaurant.orders} orders this month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">${restaurant.revenue.toLocaleString()}</p>
                <Badge variant="secondary">{restaurant.growth}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Platform Usage */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Platform Usage</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Feature Adoption</h4>
            {[
              { feature: "QR Code Menus", adoption: 98 },
              { feature: "Multi-Language", adoption: 76 },
              { feature: "Analytics Dashboard", adoption: 84 },
              { feature: "Kitchen Display", adoption: 62 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.feature}</span>
                  <span className="text-muted-foreground">{item.adoption}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.adoption}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Support Metrics</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Open Tickets</span>
                <span className="text-xl font-bold text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <span className="text-xl font-bold text-foreground">2.4h</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                <span className="text-xl font-bold text-foreground">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
