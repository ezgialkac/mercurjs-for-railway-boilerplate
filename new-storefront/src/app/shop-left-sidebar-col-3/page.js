import React from 'react'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import ShopCategorySlider from '@/components/category/ShopCategorySlider'
import MedusaProductListing from '@/components/medusa/MedusaProductListing'

const page = async ({ searchParams }) => {
  const q = searchParams?.q || ""
  const pageNum = Number(searchParams?.page || 1)

  return (
    <>
      <Breadcrumb title={"Shop Page"} />
      <ShopCategorySlider />
      <MedusaProductListing page={Number.isFinite(pageNum) ? pageNum : 1} q={q} />
    </>
  )
}

export default page
