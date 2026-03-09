import "server-only"
import { sdk } from "./config"

type StoreRegion = {
  id: string
  countries?: Array<{ iso_2?: string | null } | null> | null
}

const regionMap = new Map<string, StoreRegion>()

export const listRegions = async (): Promise<StoreRegion[]> => {
  const { regions } = await sdk.client.fetch<{ regions: StoreRegion[] }>(
    `/store/regions`,
    {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  )

  return regions || []
}

export const getRegionForCountryCode = async (countryCode?: string | null) => {
  const code =
    (countryCode || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us").toLowerCase()

  if (regionMap.has(code)) {
    return regionMap.get(code) || null
  }

  const regions = await listRegions()
  regions.forEach((region) => {
    region.countries?.forEach((c) => {
      const iso2 = c?.iso_2?.toLowerCase()
      if (iso2) regionMap.set(iso2, region)
    })
  })

  return regionMap.get(code) || regions[0] || null
}

