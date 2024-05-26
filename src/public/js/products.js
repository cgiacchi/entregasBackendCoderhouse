function addToCart() {
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = "6653b882694eabd5f4b6ef8f";
            const cartId = "6653b8a1694eabd5f4b6ef90";

            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();

            } catch (error) {
                console.log(error);
            }
        });
    });
}

