import Medusa from "@medusajs/js-sdk"

export const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
})

type FetchQueryOptions = Omit<RequestInit, "headers" | "body"> & {
  headers?: Record<string, string | null | { tags: string[] }>
  query?: Record<string, string | number | boolean | undefined | null>
  body?: Record<string, any>
}

export async function fetchQuery(
  url: string,
  { method, query, headers, body, ...rest }: FetchQueryOptions
) {
  const params = Object.entries(query || {}).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || value === "") return acc
    acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    return acc
  }, [] as string[])

  const res = await fetch(
    `${MEDUSA_BACKEND_URL}${url}${params.length ? `?${params.join("&")}` : ""}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(MEDUSA_PUBLISHABLE_KEY
          ? { "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY }
          : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      ...rest,
    }
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    data = { message: res.statusText || "Unknown error" }
  }

  return {
    ok: res.ok,
    status: res.status,
    error: res.ok ? null : { message: data?.message || "Request failed" },
    data: res.ok ? data : null,
  }
}
