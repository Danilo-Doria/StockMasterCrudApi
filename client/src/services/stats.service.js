// Statistics
export function updateStats(products) {
    const totalSku = document.getElementById("stat-total");
    const inventoryValue = document.getElementById("stat-value");
    const criticalStock = document.getElementById("stat-low");
    let totalValue = 0

    // for (const product of products) {
    //     totalValue += product.precio * product.stock;
    // }

    totalValue = products.reduce((acc, product) => {
        return acc + (product.precio * product.stock) 
    }, 0);

    inventoryValue.textContent = Number(totalValue.toFixed(2));
    totalSku.textContent = products.length;
}