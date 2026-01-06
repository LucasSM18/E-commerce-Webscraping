export interface SortCriterion<T> {
  property: keyof T,
  direction?: 'asc' | 'desc',
  transform?: (value: any) => any,
  stringSimilarity?: boolean
}

export interface Scraper {
  searchUrl: string,
  query?: string,
  listProducts: string,
  title: string,
  site: string
  price: string,
  originalprice?: string | null,
  discount?: string,
  shipping?: string,
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
  trustScore: number
  shipping: { free: boolean }
  url: string
  image: string
}