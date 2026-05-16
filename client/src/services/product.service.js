const urlApi = "http://localhost:3000/products"

export async function addProduct(product) {

    try {

        const response = await fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error:", error);
    }
}

export async function deleteProduct(id) {
    try {

        const response = await fetch(`${urlApi}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar producto");
        }

        return;

    } catch (error) {
        console.error("Error:", error);
    }
}

export async function editProduct(id, updatedProduct) {
    try {

        const response = await fetch(`http://localhost:3000/products/${id}`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error("Error editing product");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }

}