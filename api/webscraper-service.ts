import * as cheerio from 'cheerio';
import type { Scraper, Product } from "./interfaces.ts";

export async function webScraperProducts(request : Scraper) {
    try {
        // URL de busca
        const searchUrl = request.searchUrl;
        const query = request.query;
        let limit = 5
        // Fazer requisição com headers para simular um navegador
        const response = await fetch(searchUrl + encodeURIComponent(query), {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edge/12.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            }
        });
        //
        if(!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        const products : Product[] = [];
        
        // Selecionar os itens de cada produto
        $(request.listProducts).each((_, element) => {
            try {
                if (products.length > limit){
                    return false;
                }

                const $item = $(element);              
                // Extrair titulo
                const title = $item.find(request.title[0]).text().trim() || $item.find(request.title[1]).text().trim();
                //console.log("titulo:" + title)
                // Extrair preço
                let price: number; 
                if(request.price){
                    price = Number.parseFloat($item.find(request.price).first().text().trim());
                    //console.log("\npreço:" + price);
                } else {
                    const priceText = $item.find(request.priceText).first().text().trim() || "";
                    const priceCents = $item.find(request.priceCents).first().text().trim() || "00";
                    price = Number.parseFloat(priceText.replace(/\./g, "").replace(",", ".") + "." + priceCents.padStart(2, "0"));
                    //console.log("\npreço:", priceText , priceCents);
                }
                // Extrair preço original (se existir)
                let originalPrice: number | null = null;
                if(request.originalprice){
                    originalPrice = Number.parseFloat($item.find(request.originalprice).first().text().trim());
                    //console.log("\npreço original:" + originalPrice)
                } else {
                    const originalPriceText = $item.find(request.originalpriceText).first().text().trim();
                    const originalPriceCents = $item.find(request.originalpriceCents).first().text().trim() || "00";
                    originalPrice = Number.parseFloat(originalPriceText.replace(/\./g, "").replace(",", ".") + "." + originalPriceCents.padStart(2, "0"));
                    //console.log("\npreço original:" , originalPriceText, originalPriceCents);
                }
                // Calcular desconto
                let discount = 0;
                if(originalPrice && originalPrice > price) {
                    discount = Math.round(((originalPrice - price) / originalPrice) * 100)
                }
                //console.log("\ndisconto:", discount);

                // Extrair frete grátis
                const shippingText = $item.find(request.shipping).text().toLowerCase();
                const freeShipping = shippingText.includes("frete grátis") || shippingText.includes("envio grátis");
                //console.log("\nfrete: " + shippingText);
                
                // Extrair URL
                const url = $item.find(request.url).attr("href") || "";
                //console.log("\nurl: " + url)

                //Extrair imagem
                const image = $item.find(request.image).attr("data-src") || $item.find(request.image).attr("src") || "";
                //console.log("\nimagem: " + image)

                // Trust score simulado (Mercado Livre não expõe isso facilmente)
                // Você pode ajustar essa lógica baseado em reviews ou reputação do vendedor
                const trustScore = $item.find(request.trustScore).attr("aria-label") || $item.find(request.trustScore).text().replace(/(\r\n|\n|\r)/gm, "");
                //console.log("\nconfiança: " + trustScore)

                // Validar dados mínimos
                if(title && price && url) {
                    products.push({
                        title,
                        site: request.site,
                        price,
                        originalPrice,
                        discount,
                        trustScore,
                        shipping: { free: freeShipping },
                        url: url.split("?")[0], // Remover query params
                        image: image.replace(/-[IO]\.jpg/, "-F.jpg"), // Melhorar qualidade da imagem
                    });
                }
            } catch (err) {
                console.error("[v0] Error parsing product:", err);
            }
        });

        return {
            success: true,
            query,
            count: products.length,
            products
        };
    } catch(err) {
        console.error("[v0] Scraping error:", err);
        return {
            error: "Failed to scrape products",
            message: err instanceof Error ? err.message : "Unknown error"
        }
    }
}