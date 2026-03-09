"use server"

import { revalidatePath } from "next/cache"
import { addLineItem } from "../cart"

export async function addToCartAction(formData: FormData) {
  const variantId = String(formData.get("variant_id") || "")
  const quantityRaw = formData.get("quantity")
  const quantity = quantityRaw ? Number(quantityRaw) : 1

  await addLineItem({
    variantId,
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
  })

  revalidatePath("/medusa-demo")
}

