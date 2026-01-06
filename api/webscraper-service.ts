import * as cheerio from 'cheerio';
import type { Scraper, Product } from "./interfaces.ts";

export async function webScraperProducts(request : Scraper) {
    try {
        if(!request.query) return;
        // URL de busca
        const searchUrl = request.searchUrl + encodeURIComponent(request.query);
        let limit = 5
        // Fazer requisição com headers para simular um navegador
        const response = await fetch(searchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edge/12.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            }
        });
        //
        //console.log(response);
        if(!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
        
        const html = await response.text();
        //console.log(html);

        const $ = cheerio.load(html);
        //console.log($);
        
        const products : Product[] = [];
        
        // Selecionar os itens de cada produto
        $(request.listProducts).each((_, element) => {
            try {
                if (products.length >= limit){
                    return;
                }

                const $item = $(element);              
                // Extrair titulo
                const title = $item.find(request.title).text().trim()
                //console.log("titulo:" + title)
                // Extrair preço
                const price = Number.parseFloat($item.find(request.price).first().text().replace(/[A-Za-z.$]/g, "").replace(",", ".").trim());
                //console.log("Preço:" + price)

                // Extrair preço original (se existir)
                let originalPrice: number | null = null;
                if(request.originalprice){
                    originalPrice = Number.parseFloat($item.find(request.originalprice).text().replace(/[A-Za-z$.]/g, "").replace(",", ".").trim());
                }
                //console.log("Preço Original:" + originalPrice)

                // Calcular desconto
                let discount: number = Number.parseFloat($item.find(request.discount).text().replace(/[A-Za-z%.]/g, "").replace(",", ".").trim()) || 0;
                if(!discount && originalPrice && originalPrice > price) {
                    discount = Math.round(((originalPrice - price) / originalPrice) * 100)
                }
                //console.log("\ndisconto:", discount);

                // Extrair frete grátis
                const shippingText = $item.find(request.shipping).text().toLowerCase();
                const freeShipping = shippingText.includes("frete grátis") || shippingText.includes("envio grátis") || shippingText.includes("entrega grátis");
                //console.log("\nfrete: " + shippingText);
                
                // Extrair URL
                let url = $item.find(request.url).attr("href") || "";
                if(url.length && !url.includes("https")){
                    const urlString = new URL(searchUrl);
                    url = urlString.origin + url;
                }
                //console.log("\nurl: " + url)

                //Extrair imagem
                const image = $item.find(request.image).attr("data-src") || $item.find(request.image).attr("src") || "";
                //console.log("\nimagem: " + image)

                // Trust score simulado (Mercado Livre não expõe isso facilmente)
                // Você pode ajustar essa lógica baseado em reviews ou reputação do vendedor
                const rate = $item.find(request.trustScore).first().attr("aria-label") || $item.find(request.trustScore).first().text().replace(/(\r\n|\n|\r)/gm, "").split(" ")[0].replace(",", ".").trim();
                const trustScore = Number.parseFloat(rate);
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
                        url,
                        // url: url.split("?")[0], // Remover query params
                        image: image.replace(/-[IO]\.jpg/, "-F.jpg"), // Melhorar qualidade da imagem
                    });
                }
            } catch (err) {
                console.error("[v0] Error parsing product:", err);
            }
        });
        //console.log(products);

        return {
            success: true,
            query: request.query,
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