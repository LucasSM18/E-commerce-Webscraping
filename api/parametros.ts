import type { Scraper } from "./interfaces.ts";

export const scraperParameters : Scraper[] = [
    {
        searchUrl: "https://lista.mercadolivre.com.br/",
        listProducts: "li.ui-search-layout__item",
        title: 'a.poly-component__title',
        site: "Mercado Livre",
        price: ".poly-component__price .poly-price__current .andes-money-amount__fraction",
        originalprice: ".poly-component__price .andes-money-amount--previous .andes-money-amount__fraction",
        discount: ".poly-component__price .poly-price__current .andes-money-amount__discount" ,
        shipping: ".poly-component__shipping",
        url: "a.poly-component__title",
        image: "img",
        trustScore: "span.poly-component__review-compacted span.poly-phrase-label"
    },
    {
        searchUrl: "https://www.magazineluiza.com.br/busca/",
        listProducts: "ul[data-testid=list] li",
        title: 'h2[data-testid=product-title]',
        site: "Magazine Luiza",
        price: "p[data-testid=price-value]",
        originalprice: "p[data-testid=price-original]",
        url: "a[data-testid=product-card-container]",
        image: "img",
        trustScore: "span[format=score-count]"
    },
    {
        searchUrl: "https://www.amazon.com.br/s?k=",
        listProducts: "div[role=listitem]",
        title: 'div[data-cy=title-recipe] > a',
        site: "Amazon",
        price: "div[data-cy=price-recipe] a > .a-price .a-offscreen",
        originalprice: "div[data-cy=price-recipe] a > .a-price.a-text-price .a-offscreen",
        shipping: "div[data-cy=delivery-block]",
        url: "div[data-cy=title-recipe] > a",
        image: "img",
        trustScore: "div[data-cy=reviews-block] div > span.a-size-small.a-color-base"
    }
]