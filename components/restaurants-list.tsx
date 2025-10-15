"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Ban, MapPin, Users } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  location: string
  plan: "Starter" | "Professional" | "Business"
  status: "active" | "trial" | "suspended" | "cancelled"
  users: number
  monthlyOrders: number
  revenue: number
  joinedDate: string
}

export function RestaurantsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Bella Italia",
      location: "New York, NY",
      plan: "Professional",
      status: "active",
      users: 12,
      monthlyOrders: 1248,
      revenue: 199,
      joinedDate: "Jan 2025",
    },
    {
      id: "2",
      name: "Sushi Master",
      location: "Los Angeles, CA",
      plan: "Business",
      status: "active",
      users: 24,
      monthlyOrders: 2156,
      revenue: 399,
      joinedDate: "Dec 2024",
    },
    {
      id: "3",
      name: "Burger House",
      location: "Chicago, IL",
      plan: "Starter",
      status: "trial",
      users: 5,
      monthlyOrders: 342,
      revenue: 0,
      joinedDate: "Jan 2025",
    },
    {
      id: "4",
      name: "Taco Fiesta",
      location: "Austin, TX",
      plan: "Professional",
      status: "active",
      users: 8,
      monthlyOrders: 892,
      revenue: 199,
      joinedDate: "Nov 2024",
    },
  ]

  const getStatusBadge = (status: Restaurant["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>
      case "trial":
        return <Badge variant="secondary">Trial</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>
    }
  }

  const getPlanBadge = (plan: Restaurant["plan"]) => {
    const colors = {
      Starter: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      Professional: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      Business: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    }
    return <Badge className={colors[plan]}>{plan}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Restaurants</h2>
          <p className="text-muted-foreground">Manage all restaurants on the platform</p>
        </div>
        <Button>Add Restaurant</Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Restaurants Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Restaurant</th>
                <th className="text-left p-4 font-semibold text-foreground">Plan</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Users</th>
                <th className="text-left p-4 font-semibold text-foreground">Orders/Month</th>
                <th className="text-left p-4 font-semibold text-foreground">Revenue</th>
                <th className="text-left p-4 font-semibold text-foreground">Joined</th>
                <th className="text-left p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-t border-border">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-foreground">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {restaurant.location}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{getPlanBadge(restaurant.plan)}</td>
                  <td className="p-4">{getStatusBadge(restaurant.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{restaurant.users}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-foreground">{restaurant.monthlyOrders.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-foreground">${restaurant.revenue}/mo</span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground">{restaurant.joinedDate}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
