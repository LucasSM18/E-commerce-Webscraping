export interface Scraper {
  searchUrl: string,
  query: string,
  listProducts: string,
  title: string,
  site: string
  priceText: string,
  priceCents: string,
  price?: string | null,
  originalpriceText: string,
  originalpriceCents: string,
  originalprice?: string | null,
  shipping: string,
  url: string,
  image: string,
  trustScore: string
}

export interface Product {
  title: string
  site: string
  price: number
  originalPrice: number | null
  discount: number
  trustScore: string
  shipping: { free: boolean }
  url: string
  image: string
}