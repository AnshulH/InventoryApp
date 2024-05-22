import React, { Component } from 'react';
import API from '../Api/Api';
import Inventory from './Inventory';
import Cart from './Cart';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.api = new API();
        this.state = {
            inventory: [],
            cart: []
        }
    }
    
    async componentDidMount() {
        try {
            let inventory = await this.api.getInventory();
            let cart = await this.api.getCart();

            inventory = inventory.map((item) => {
                return {
                    ...item,
                    quantity: 0
                };
            })
            this.setState({
                inventory: inventory,
                cart: cart
            })
        } catch(err) {
            console.log(err);
        }
    }

    inventoryQuantityIncrement = (id) => {
        this.setState({
            ...this.state,
            inventory: this.state.inventory.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            })
        });
    }

    inventoryQuantityDecrement = (id) => {
        this.setState({
            ...this.state,
            inventory: this.state.inventory.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: Math.max(0, item.quantity - 1)
                    };
                }
                return item;
            })
        });
    }

    addToCart = async (id) => {
        const present = this.state.cart.find((item) => item.id === id);
        
        if (present != undefined) {
            let cartItem = this.state.cart.find((item) => item.id === id);
            let inventoryItem = this.state.inventory.find((item) => item.id === id);
            let newQuantity = cartItem.quantity + inventoryItem.quantity;
            let res = await this.api.updateCart(id, newQuantity, inventoryItem.content);

            if (res) {
                this.setState({
                    ...this.state,
                    cart: this.state.cart.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                quantity: newQuantity
                            };
                        }

                        return item;
                    })
                });
            }
        } else {
            let inventoryItem = this.state.inventory.find((item) => item.id === id);
            let res = await this.api.addToCart(inventoryItem);
            let newItem = {...inventoryItem};
            if (res) {
                this.setState({
                    ...this.state,
                    cart: [
                        ...this.state.cart,
                        newItem
                    ]
                });
            }
        }
    }

    deleteCartItem = async (id) => {
        let res = await this.api.deleteFromCart(id);

        try {
            this.setState({
                ...this.state,
                cart: this.state.cart.filter((item) => {
                    if (item.id === id) {
                        return false;
                    }
                    return true;
                })
            });
        } catch(err) {
            console.log(err);
        }
    }

    emptyCart = async () => {
        let res = await this.api.checkout();

        try {
            this.setState({
                ...this.state,
                cart: this.state.cart.filter((item) => {
                    return false;
                })
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return <div className='menu-app'>
            <Inventory 
                inventory={this.state.inventory} 
                inventoryQuantityIncrement={this.inventoryQuantityIncrement}
                inventoryQuantityDecrement={this.inventoryQuantityDecrement}
                addToCart={this.addToCart}
            />
            <Cart 
                cart={this.state.cart}
                deleteCartItem={this.deleteCartItem}
                emptyCart={this.emptyCart}
            />
        </div>;
    }
}

export default Menu;

