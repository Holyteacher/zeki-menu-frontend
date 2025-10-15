import { CustomerMenu } from "@/components/customer-menu"

export default function MenuPage({ params }: { params: { restaurantSlug: string } }) {
  return <CustomerMenu restaurantSlug={params.restaurantSlug} />
}
