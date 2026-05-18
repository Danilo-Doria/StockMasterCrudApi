import { renderProducts } from "./ui.service";


// SEARCH BAR
export function searchProduct(totalProducts, limitedProducts) {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener('input', () => {

        const text = searchInput.value.toLowerCase();

        const filteredProducts = totalProducts.filter(product =>
            product.nombre.toLowerCase().includes(text)
        );

        if (!text) {
            renderProducts(limitedProducts, totalProducts);
        } else {
            renderProducts(filteredProducts, totalProducts);
        }
    });
}