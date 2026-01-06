import type { Scraper } from "./interfaces.ts";

export const mercadoLivre : Scraper = {
    searchUrl: "https://lista.mercadolivre.com.br/",
    listProducts: "li.ui-search-layout__item",
    query: "",
    title: 'a.poly-component__title',
    site: "Mercado Livre",
    priceText: ".andes-money-amount__fraction",
    priceCents: ".andes-money-amount__cents",
    originalpriceText: ".andes-money-amount--previous .andes-money-amount__fraction",
    originalpriceCents: ".andes-money-amount--previous .andes-money-amount__cents",
    shipping: ".poly-component__shipping",
    url: "a.poly-component__title",
    image: "img",
    trustScore: "span.poly-component__review-compacted"
}