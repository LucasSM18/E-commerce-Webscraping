import dotenv from "dotenv";
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { webScraperProducts } from "./webscraper-service.ts";
import { mercadoLivre } from "./parametros.ts"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: __dirname+'/./../.env' });
const app = express();
const port = process.env.APP_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

app.get('/scraper', async (req, res) => {
  const query = req.query.q?.toString() || "";
  let product = await webScraperProducts({...mercadoLivre, query});
  res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`))

