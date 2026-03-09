import "server-only"
import { sdk } from "./config"
import { getRegionForCountryCode } from "./regions"

export type StoreCalculatedPrice = {
  currency_code: string
  calculated_amount?: number | null
  calculated_amount_with_tax?: number | null
  calculated_amount_without_tax?: number | null
  original_amount?: number | null
  original_amount_with_tax?: number | null
}

export type StoreProductVariant = {
  id: string
  title?: string
  sku?: string | null
  inventory_quantity?: number | null
  calculated_price?: StoreCalculatedPrice | null
}

export type StoreProduct = {
  id: string
  title: string
  handle?: string | null
  description?: string | null
  thumbnail?: string | null
  images?: Array<{ id?: string; url: string } | null> | null
  variants?: StoreProductVariant[] | null
}

export async function listProducts(input?: {
  page?: number
  limit?: number
  q?: string
  countryCode?: string
}) {
  const page = Math.max(1, input?.page || 1)
  const limit = input?.limit || 12
  const offset = (page - 1) * limit

  const region = await getRegionForCountryCode(input?.countryCode)
  if (!region?.id) {
    return { products: [] as StoreProduct[], count: 0, nextPage: null as number | null }
  }

  const { products, count } = await sdk.client.fetch<{
    products: StoreProduct[]
    count: number
  }>(`/store/products`, {
    method: "GET",
    query: {
      q: input?.q,
      limit,
      offset,
      region_id: region.id,
      country_code: input?.countryCode,
      fields:
        "id,title,handle,description,thumbnail,images,*variants,*variants.calculated_price,+variants.inventory_quantity",
    },
    cache: "no-cache",
  })

  const nextPage = count > offset + limit ? page + 1 : null

  return { products: products || [], count: count || 0, nextPage }
}

export async function retrieveProductByHandle(input: {
  handle: string
  countryCode?: string
}) {
  const region = await getRegionForCountryCode(input.countryCode)
  if (!region?.id) return null

  const { products } = await sdk.client.fetch<{ products: StoreProduct[] }>(
    `/store/products`,
    {
      method: "GET",
      query: {
        handle: input.handle,
        limit: 1,
        region_id: region.id,
        country_code: input.countryCode,
        fields:
          "id,title,handle,description,thumbnail,images,*variants,*variants.calculated_price,+variants.inventory_quantity",
      },
      cache: "no-cache",
    }
  )

  return products?.[0] || null
}

