import { NextResponse } from "next/server"
import { listProducts, retrieveProductByHandle } from "@/lib/medusa/products"
import { getCheapestVariant, getVariantDisplayPrice } from "@/lib/medusa/pricing"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const handle = url.searchParams.get("handle") || undefined

  let product = handle ? await retrieveProductByHandle({ handle }) : null

  if (!product) {
    const { products } = await listProducts({ limit: 1, page: 1 })
    product = products[0] || null
  }

  if (!product) {
    return NextResponse.json({ product: null }, { status: 404 })
  }

  const cheapest = getCheapestVariant(product)
  const price = cheapest ? getVariantDisplayPrice(cheapest) : null

  const enriched = {
    ...product,
    priceFormatted: price?.formatted ?? null,
    priceAmount: price?.amount ?? null,
    currency_code: price?.currency_code ?? null,
    sku: (cheapest as any)?.sku ?? null,
    inventory_quantity: (cheapest as any)?.inventory_quantity ?? null,
  }

  return NextResponse.json({ product: enriched })
}

