"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export function PlatformSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Platform Settings</h2>
        <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="Zeki Menü" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@zekimenu.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform-description">Platform Description</Label>
            <Textarea
              id="platform-description"
              rows={3}
              defaultValue="Smart digital menu platform for modern restaurants"
            />
          </div>
        </div>
      </Card>

      {/* Subscription Plans */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Subscription Plans</h3>
        <div className="space-y-4">
          {[
            { name: "Starter", price: 49, features: "Up to 50 menu items, 1 location" },
            { name: "Professional", price: 199, features: "Unlimited items, 3 locations, Analytics" },
            { name: "Business", price: 399, features: "Everything + Priority support, Custom branding" },
          ].map((plan) => (
            <div key={plan.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{plan.name}</p>
                <p className="text-sm text-muted-foreground">{plan.features}</p>
              </div>
              <div className="flex items-center gap-4">
                <Input type="number" defaultValue={plan.price} className="w-24" />
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Feature Flags */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Feature Flags</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Restaurant Signups</Label>
              <p className="text-sm text-muted-foreground">Allow new restaurants to sign up</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Beta Features</Label>
              <p className="text-sm text-muted-foreground">Enable beta features for all restaurants</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Welcome Emails</Label>
              <p className="text-sm text-muted-foreground">Send welcome email to new restaurants</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Monthly Reports</Label>
              <p className="text-sm text-muted-foreground">Send monthly performance reports</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Send promotional emails to restaurants</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
