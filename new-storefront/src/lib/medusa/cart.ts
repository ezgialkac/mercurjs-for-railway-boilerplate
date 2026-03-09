import "server-only"
import { sdk } from "./config"
import { getCartId, removeCartId, setCartId } from "./cookies"
import { getRegionForCountryCode } from "./regions"

type StoreCart = {
  id: string
  items?: Array<{ id: string; quantity: number } | null> | null
}

export async function retrieveCart(cartId?: string) {
  const id = cartId || (await getCartId())
  if (!id) return null

  try {
    const { cart } = await sdk.client.fetch<{ cart: StoreCart }>(
      `/store/carts/${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    )
    return cart || null
  } catch {
    await removeCartId()
    return null
  }
}

export async function getOrCreateCart(countryCode?: string) {
  const existing = await retrieveCart()
  if (existing) return existing

  const region = await getRegionForCountryCode(countryCode)
  if (!region?.id) {
    throw new Error(
      "No Medusa regions found. Create regions in Admin, then set NEXT_PUBLIC_DEFAULT_REGION."
    )
  }

  const { cart } = await sdk.store.cart.create({ region_id: region.id })
  await setCartId(cart.id)
  return cart as StoreCart
}

export async function addLineItem(input: {
  variantId: string
  quantity?: number
  countryCode?: string
}) {
  const { variantId, quantity = 1, countryCode } = input
  if (!variantId) throw new Error("Missing variantId")

  const cart = await getOrCreateCart(countryCode)

  await sdk.store.cart.createLineItem(cart.id, {
    variant_id: variantId,
    quantity,
  })

  return await retrieveCart(cart.id)
}

