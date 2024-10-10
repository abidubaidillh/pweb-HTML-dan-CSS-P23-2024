const productsContainer = document.getElementById('products-container');
const leftButton = document.getElementById('left-button');
const farLeftButton = document.getElementById('farleft-button');
const rightButton = document.getElementById('right-button');
const farRightButton = document.getElementById('farright-button');
const searchBar = document.getElementById('search-bar');

let currentPage = 1;
const productsPerPage = 9;

async function fetchProducts(page) {
    const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`);
    const data = await response.json();
    return data.products;
}

function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" width="100">
            <h3 style="color: #555">${product.title}</h3>
            <p style="color: #555">${product.price}</p>
            <a href="#">Detail</a>
        `;
        productsContainer.appendChild(productItem);
    });
}

async function updateProducts() {
    const products = await fetchProducts(currentPage);
    displayProducts(products);
}

leftButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateProducts();
    }
});

farLeftButton.addEventListener('click', () => {
    currentPage = 1;
    updateProducts();
});

rightButton.addEventListener('click', () => {
    currentPage++;
    updateProducts();
});

farRightButton.addEventListener('click', () => {
    currentPage = Math.ceil(100 / productsPerPage);
    updateProducts();
});

let currentQuery = '';

async function fetchFilteredProducts(query, page) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`);
    const data = await response.json();
    return data.products;
}

async function updateFilteredProducts(query) {
    const products = await fetchFilteredProducts(query, currentPage);
    displayProducts(products);
}

searchBar.addEventListener('input', () => {
    currentPage = 1;
    currentQuery = searchBar.value;
    updateFilteredProducts(currentQuery);
});

leftButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        if (currentQuery) {
            updateFilteredProducts(currentQuery);
        } else {
            updateProducts();
        }
    }
});

farLeftButton.addEventListener('click', () => {
    currentPage = 1;
    if (currentQuery) {
        updateFilteredProducts(currentQuery);
    } else {
        updateProducts();
    }
});

rightButton.addEventListener('click', () => {
    currentPage++;
    if (currentQuery) {
        updateFilteredProducts(currentQuery);
    } else {
        updateProducts();
    }
});

farRightButton.addEventListener('click', () => {
    currentPage = Math.ceil(100 / productsPerPage);
    if (currentQuery) {
        updateFilteredProducts(currentQuery);
    } else {
        updateProducts();
    }
});

updateProducts();
