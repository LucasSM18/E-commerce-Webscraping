import dotenv from "dotenv";
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Product, SortCriterion } from "./interfaces.ts";
import { webScraperProducts } from "./webscraper-service.ts";
import { scraperParameters } from "./parametros.ts";
import { compareTwoStrings } from "string-similarity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname + '/./../.env' });
const app = express();
const port = process.env.APP_PORT || 3000;
let query = "";

//Função que faz a ordenação dinâmica dos produtos
function dynamicSort<T>(criteria: SortCriterion<T>[]) {
  return ((a: T, b: T) : number => {
    for (const criterion of criteria){
      const { property, direction = 'asc', transform = (x) => x, stringSimilarity = false } = criterion;
      const aValue = transform(a[property]);
      const bValue = transform(b[property]);
      //
      switch(typeof aValue === "string"){
        case true:
          if(stringSimilarity) return direction === 'asc' ? compareStrings(aValue, bValue) : compareStrings(aValue, bValue, "desc");
          return direction === 'asc' ? aValue.localeCompare(bValue) : aValue.localeCompare(bValue) * -1;
        default:
          if(aValue < bValue) return direction === 'asc' ? -1 : 1;
          else if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
};

//Fução para fazer a comparação dos titulos dos produtos com a Query, para ver a o quanto são similares
function compareStrings(a:string, b:string, order : 'asc' | 'desc' = 'asc'){
  const simA = compareTwoStrings(a, query);
  const simB = compareTwoStrings(b, query);
  //
  return order === 'asc' ? simB - simA : simA - simB 
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

app.get('/scraper', async (req, res) => {
  query = req.query.q?.toString() || "";
  let status : boolean = false;
  let response : Product[] = [];
  //
  await Promise.all(scraperParameters.map(async el => { 
    await webScraperProducts({...el, query}).then(el => {
      if(el?.success && el?.products?.length) {
        status = el.success;
        response.push(...el.products); 
      }
    }).catch(err => {
      console.log(err);
    });
  }));
  //
  res.json({
    status: status,
    count: response.length,
    products: [...response].sort(dynamicSort([
      { property: 'title', stringSimilarity: true },
      { property: 'price' },
      { property: 'trustScore', direction: 'desc' }
    ]))
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));