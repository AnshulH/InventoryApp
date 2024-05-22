class API {
    constructor() {
        this.URL = "http://localhost:3000";
        this.cart = "cart";
        this.inventory = "inventory";
    }

    getCart = async () => {
        let cartURL = `http://localhost:3000/${this.cart}`;
        let response = await fetch(cartURL);
        response = await response.json();
        return response;
    };

    getInventory = async () => {
        let inventoryURL = `http://localhost:3000/${this.inventory}`;
        let response = await fetch(inventoryURL);
        response = await response.json();
        return response;
    };

    addToCart = async (inventoryItem) => {
        let response = await fetch(`http://localhost:3000/${this.cart}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": inventoryItem.content,
                "id": inventoryItem.id,
                "quantity": inventoryItem.quantity
            })
        });
        response = await response.json();
        return response;
    };

    updateCart = async (id, newAmount, content) => {
        let response = await fetch(`http://localhost:3000/${this.cart}/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "quantity": newAmount,
                "content": content
            })
        });
        response = await response.json();
        return response;
    };

    deleteFromCart = async (id) => {
        let response = await fetch(`http://localhost:3000/${this.cart}/${id}`, {method: "DELETE"});
        response = await response.json();
        return response;
    };

    checkout = async () => {
        return this.getCart().then((data) =>
            Promise.all(data.map((item) => this.deleteFromCart(item.id)))
        );
    };
};

export default API;