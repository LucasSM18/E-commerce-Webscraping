// Estado da aplicação
let isLoading = false;

// Base de dados de demonstração (simula resultados de e-commerce)
// const demoProducts = {
//   notebook: [
//     {
//       title: "Notebook Dell Inspiron 15 i5 8GB 256GB SSD",
//       site: "Mercado Livre",
//       price: 2899.0,
//       originalPrice: 3499.0,
//       discount: 17,
//       trustScore: 98,
//       shipping: { free: true },
//       url: "https://mercadolivre.com.br",
//       image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Notebook Lenovo IdeaPad 3i i7 12GB 512GB",
//       site: "Amazon Brasil",
//       price: 3299.0,
//       originalPrice: 3899.0,
//       discount: 15,
//       trustScore: 95,
//       shipping: { free: true },
//       url: "https://amazon.com.br",
//       image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Notebook Acer Aspire 5 Ryzen 5 8GB 256GB",
//       site: "Magazine Luiza",
//       price: 2599.0,
//       originalPrice: 2999.0,
//       discount: 13,
//       trustScore: 92,
//       shipping: { free: false },
//       url: "https://magazineluiza.com.br",
//       image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Notebook Samsung Book E30 Intel i3 4GB 1TB",
//       site: "Americanas",
//       price: 1899.0,
//       trustScore: 88,
//       shipping: { free: true },
//       url: "https://americanas.com.br",
//       image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=300&h=300&fit=crop",
//     },
//   ],
//   celular: [
//     {
//       title: "Samsung Galaxy A54 5G 128GB Preto",
//       site: "Mercado Livre",
//       price: 1699.0,
//       originalPrice: 1999.0,
//       discount: 15,
//       trustScore: 97,
//       shipping: { free: true },
//       url: "https://mercadolivre.com.br",
//       image: "https://images.unsplash.com/photo-1511707171634-5b89351aff97?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Motorola Moto G84 5G 256GB Azul",
//       site: "Amazon Brasil",
//       price: 1399.0,
//       originalPrice: 1699.0,
//       discount: 18,
//       trustScore: 94,
//       shipping: { free: true },
//       url: "https://amazon.com.br",
//       image: "https://images.unsplash.com/photo-1598327105666-5b897ff02aa9?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Xiaomi Redmi Note 13 Pro 256GB Grafite",
//       site: "Magazine Luiza",
//       price: 1599.0,
//       trustScore: 91,
//       shipping: { free: false },
//       url: "https://magazineluiza.com.br",
//       image: "https://images.unsplash.com/photo-1592286927505-2c5c2c1eb096?w=300&h=300&fit=crop",
//     },
//   ],
//   fone: [
//     {
//       title: "Fone JBL Tune 510BT Bluetooth Preto",
//       site: "Mercado Livre",
//       price: 189.0,
//       originalPrice: 249.0,
//       discount: 24,
//       trustScore: 96,
//       shipping: { free: true },
//       url: "https://mercadolivre.com.br",
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Fone Sony WH-CH520 Wireless Azul",
//       site: "Amazon Brasil",
//       price: 199.0,
//       originalPrice: 279.0,
//       discount: 29,
//       trustScore: 98,
//       shipping: { free: true },
//       url: "https://amazon.com.br",
//       image: "https://images.unsplash.com/photo-1545127398146-87563907a212?w=300&h=300&fit=crop",
//     },
//   ],
//   teclado: [
//     {
//       title: "Teclado Mecânico Redragon Kumara K552 RGB",
//       site: "Mercado Livre",
//       price: 249.0,
//       originalPrice: 349.0,
//       discount: 29,
//       trustScore: 95,
//       shipping: { free: true },
//       url: "https://mercadolivre.com.br",
//       image: "https://images.unsplash.com/photo-1587864550417-7fd91fc51a46?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Teclado Logitech K380 Bluetooth Cinza",
//       site: "Amazon Brasil",
//       price: 199.0,
//       trustScore: 97,
//       shipping: { free: true },
//       url: "https://amazon.com.br",
//       image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop",
//     },
//   ],
//   mouse: [
//     {
//       title: "Mouse Logitech MX Master 3S Grafite",
//       site: "Amazon Brasil",
//       price: 449.0,
//       originalPrice: 599.0,
//       discount: 25,
//       trustScore: 99,
//       shipping: { free: true },
//       url: "https://amazon.com.br",
//       image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
//     },
//     {
//       title: "Mouse Gamer Razer DeathAdder V2 RGB",
//       site: "Mercado Livre",
//       price: 199.0,
//       originalPrice: 299.0,
//       discount: 33,
//       trustScore: 93,
//       shipping: { free: true },
//       url: "https://mercadolivre.com.br",
//       image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
//     },
//   ],
// }

// Elementos DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const buttonText = document.getElementById("buttonText");
const starRating = document.getElementById("starRating");
const percentSlider = document.getElementById('percentSlider');
const features = document.getElementById("features");
const errorMessage = document.getElementById("errorMessage");
const resultsHeader = document.getElementById("resultsHeader");
const resultsContainer = document.getElementById("resultsContainer");
const loadingState = document.getElementById("loadingState");
const totalFoundElement = document.getElementById("totalFound");
const resultsText = document.getElementById("resultsText");

//
starRating.innerHTML = starRatingDiv();

// Event Listeners
searchForm.addEventListener("submit", handleSearch)

// Sincronizar slider e input de porcentagem
percentSlider.addEventListener('input', (e) => {
  //percentInput.value = e.target.value;
  setRatingByPercent(e.target.value);
});

// Função principal de busca
async function handleSearch(e) {
  e.preventDefault();

  const query = searchInput.value.trim().toLowerCase();
  if (!query) return

  //getProdutos(query);
  setLoading(true);
  hideError();
  clearResults();

  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    // Busca nos dados de demonstração
    let foundProducts = [];

    const response = await fetch(`http://localhost:3000/scraper?q=${encodeURIComponent(query)}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Busca por categoria exata
    foundProducts.push(...data.products);

    // if (demoProducts[query]) {
    //   foundProducts = demoProducts[query];
    // } else {
    //   // Busca parcial em todas as categorias
    //   for (const category in demoProducts) {
    //     if (category.includes(query) || query.includes(category)) {
    //       foundProducts = [...foundProducts, ...demoProducts[category]];
    //     }
    //   }

    //   // Se não encontrou por categoria, busca no título
    //   if (foundProducts.length === 0) {
    //     for (const category in demoProducts) {
    //       const matches = demoProducts[category].filter((product) => product.title.toLowerCase().includes(query));
    //       foundProducts = [...foundProducts, ...matches];
    //     }
    //   }
    // }

    // Ordena do mais barato para o mais caro
    //foundProducts.sort((a, b) => a.price - b.price);

    if (foundProducts.length > 0) {
      displayResults(foundProducts, foundProducts.length);
    } else {
      showError(`Nenhum produto encontrado para "${query}". Tente: notebook, celular, fone, teclado ou mouse`);
    }
  } catch (error) {
    console.error("Erro na busca:", error);
    showError("Erro ao buscar produtos");
  } finally {
    setLoading(false);
  }
}

// Gerenciamento de estado de loading
function setLoading(loading) {
  isLoading = loading;
  searchButton.disabled = loading;
  searchInput.disabled = loading;

  if (loading) {
    buttonText.textContent = "Buscando...";
    loadingState.style.display = "block";
    features.style.display = "none";
  } else {
    buttonText.textContent = "Buscar";
    loadingState.style.display = "none";
  }
}

// Exibir erro
function showError(message) {
  errorMessage.style.display = "block";
  errorMessage.querySelector(".error-text").textContent = message;
  resultsHeader.style.display = "none";
}

// Esconder erro
function hideError() {
  errorMessage.style.display = "none";
}

// Limpar resultados
function clearResults() {
  resultsContainer.innerHTML = "";
  resultsHeader.style.display = "none";
}

// Exibir resultados
function displayResults(products, totalFound) {
  if (products.length === 0) {
    showError("Nenhum produto encontrado");
    return;
  }

  // Atualizar header de resultados
  totalFoundElement.textContent = totalFound;
  resultsText.textContent = totalFound === 1 ? "resultado encontrado" : "resultados encontrados";
  resultsHeader.style.display = "block";

  // Criar cards de produtos
  resultsContainer.innerHTML = products.map((product) => createProductCard(product)).join("");
}

// Criar card de produto
function createProductCard(product) {
  const hasDiscount = product.discount && product.discount > 0;
  const hasFreeShipping = product.shipping?.free;

  return `
        <div class="product-card">
            <div class="product-content">
                ${
                  product.image
                    ? `
                    <div class="product-image-wrapper">
                      <img 
                        src="${product.image}"  
                        fetchpriority="high"
                        aria-hidden="true"
                        decoding="async"
                        class="product-image"
                        onerror="this.onerror=null; this.src='/public/placeholder.svg?height=128&width=128';"
                      >
                    </div>
                `
                    : ""
                }
                
                <div class="product-info">
                    <div class="product-header">
                        <h3 class="product-title">${escapeHtml(product.title)}</h3>
                        <span class="badge badge-site">${escapeHtml(product.site)}</span>
                    </div>

                    <div class="product-meta">
                        ${starRatingDiv(product.trustScore, false)}
                        ${hasFreeShipping ? '<span class="badge badge-shipping">Frete Grátis</span>' : ""}
                        ${hasDiscount ? `<span class="badge badge-discount">${product.discount}% OFF</span>` : ""}
                    </div>

                    <div class="product-footer">
                        <div class="price-wrapper">
                            ${
                              product.originalPrice
                                ? `
                                <p class="original-price">R$ ${product.originalPrice.toFixed(2)}</p>
                            `
                                : ""
                            }
                            <p class="current-price">R$ ${product.price.toFixed(2)}</p>
                        </div>

                        <a 
                            href="${escapeHtml(product.url)}" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="view-offer-button"
                        >
                            Ver Oferta
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}

// Utilitário para escapar HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

function starRatingDiv(rating, editable) {
  const starRatingContainer = document.createElement('div');
  starRatingContainer.id = 'starRating';
  starRatingContainer.className = 'trust-score';
  //
  const svgStar = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `;
  rating = rating ? Math.max(0, Math.min(5, rating)) : 0 
  //
  for (let i = 0; i < 5; i++){
    const starValue = i + 1;
    let rightClip = 100;

    if (rating >= starValue) {
      rightClip = 0
    }
    else if (rating > i && rating < starValue){
      const percentage = ((rating - i) * 100);
      rightClip = rightClip - percentage;
    }
    //
    const starDiv = document.createElement('div');
    starDiv.className = 'star';
    starDiv.innerHTML = `
        <div class="star-empty">${svgStar}</div>
        <div class="star-filled" style="clip-path: inset(0 ${rightClip}% 0 0);">${svgStar}</div>
    `;
    starDiv.addEventListener("click", () => setRatingByNumber(i + 1));
    starRatingContainer.append(starDiv);
  }
  //
  return starRatingContainer.outerHTML;
}

// Função para atualizar as estrelas
function updateStars(rating) {
  const stars = document.querySelectorAll('.star');
      
  stars.forEach((star, index) => {
      const filledPart = star.querySelector('.star-filled');
      const starValue = index + 1;
        
      if (rating >= starValue) {
        // Estrela completamente preenchida
        filledPart.style.clipPath = 'inset(0 0 0 0)';
      } else if (rating > index && rating < starValue) {
        // Estrela parcialmente preenchida
        const percentage = ((rating - index) * 100);
        const rightClip = 100 - percentage;
        filledPart.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
      } else {
        // Estrela vazia
        filledPart.style.clipPath = 'inset(0 100% 0 0)';
    }
  });
}

// Definir rating por porcentagem (0-100%)
function setRatingByPercent(percent) {
  percent = Math.max(0, Math.min(100, percent));
  const rating = (percent / 100) * 5;
      
  updateStars(rating);
  displayValue.textContent = rating.toFixed(1);
  displayPercent.textContent = Math.round(percent);
  numberInput.value = rating.toFixed(1);
}

// Definir rating por valor numérico (1-5)
function setRatingByNumber(value) {
  if (value === undefined) {
    value = parseFloat(numberInput.value);
  }
  value = Math.max(0, Math.min(5, value));
      
  updateStars(value);
  displayValue.textContent = value.toFixed(1);
      
  const percent = Math.round((value / 5) * 100);
  displayPercent.textContent = percent;
  percentInput.value = percent;
  percentSlider.value = percent;
}