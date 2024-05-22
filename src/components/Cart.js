import React, { Component } from 'react';
import API from '../Api/Api';

class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='cart-container'>
            <ul>
                {this.props.cart.map((item) => {
                    return <li key={item.id}>
                            {item.content} 
                            <span>{item.quantity}</span> 
                            <button onClick={() => {this.props.deleteCartItem(item.id)}}> Delete </button>
                        </li>
                })}
            </ul>
            <button onClick={this.props.emptyCart}> Checkout </button>
        </div>
    }
}

export default Cart;