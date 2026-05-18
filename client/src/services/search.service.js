import { renderProducts } from "./ui.service";


// SEARCH BAR
export function searchProduct(products) {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener('input', () => {

        const text = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.nombre.toLowerCase().startsWith(text)
        );

        renderProducts(filteredProducts);
    });
}