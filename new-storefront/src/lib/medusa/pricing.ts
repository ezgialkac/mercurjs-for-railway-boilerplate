import type { StoreProduct, StoreProductVariant } from "./products"

export function formatMoney(input: {
  amount: number
  currency_code: string
  locale?: string
}) {
  const { amount, currency_code, locale = "en-US" } = input
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency_code,
  }).format(amount / 100)
}

export function getCheapestVariant(product: StoreProduct) {
  const variants = (product.variants || []).filter(Boolean) as StoreProductVariant[]
  const priced = variants.filter(
    (v) =>
      v?.calculated_price &&
      (v.calculated_price.calculated_amount_with_tax != null ||
        v.calculated_price.calculated_amount != null)
  )

  if (!priced.length) return null

  const pickAmount = (v: StoreProductVariant) =>
    v.calculated_price?.calculated_amount_with_tax ??
    v.calculated_price?.calculated_amount ??
    Number.POSITIVE_INFINITY

  return priced.sort((a, b) => pickAmount(a) - pickAmount(b))[0] || null
}

export function getVariantDisplayPrice(variant: StoreProductVariant) {
  const price = variant.calculated_price
  if (!price?.currency_code) return null

  const amount =
    price.calculated_amount_with_tax ?? price.calculated_amount ?? null
  if (amount == null) return null

  return {
    amount,
    currency_code: price.currency_code,
    formatted: formatMoney({ amount, currency_code: price.currency_code }),
  }
}

