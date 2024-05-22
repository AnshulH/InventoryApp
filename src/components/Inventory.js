import React, { Component } from 'react';
import API from '../Api/Api';

class Inventory extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return <div className='inventory-container'>
            <ul>
                {this.props.inventory.map((item) => {
                    return <li key={item.content} >
                    {item.content} 
                    <button onClick={() => {this.props.inventoryQuantityDecrement(item.id)}}> - </button> 
                    {item.quantity} 
                    <button onClick={() => {this.props.inventoryQuantityIncrement(item.id)}}> + </button> 
                    <button onClick={() => {this.props.addToCart(item.id)}}> Add to cart </button></li>
                })}
            </ul>
        </div>
    }
}

export default Inventory;