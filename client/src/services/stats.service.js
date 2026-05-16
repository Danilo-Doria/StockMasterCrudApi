export function updateStats(products) {
    const totalSku = document.getElementById("stat-total");
    const inventoryValue = document.getElementById("stat-value");
    const criticalStock = document.getElementById("stat-low");
    let totalValue = 0

    for (const product of products) {
        totalValue += Number(product.precio) * Number(product.stock);
    }
    inventoryValue.textContent = totalValue.toFixed(2);
    totalSku.textContent = products.length;
}