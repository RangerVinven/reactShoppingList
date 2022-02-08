import React from "react";

function ShoppingListItem(props) {

    function checkItem() {
        props.gotItem(props.shoppingItem._id);
    }

    // Checks if the item is got or not
    function checkIfItemIsChecked() {
        if(props.shoppingItem.got) {
            return <del>{props.shoppingItem.itemName + " x" + props.shoppingItem.amount}</del>
        }
        return <>{props.shoppingItem.itemName + " x" + props.shoppingItem.amount}</>
    }

    // Adds to the amount
    function addToAmount() {
        props.incrementAmount(props.shoppingItem._id);const axios = require('axios').default;
        axios.get("http://192.168.1.164:5000/v1/getShoppingList").then(response => {
            const shoppingListItems = response.data;
            console.log(shoppingListItems);

            this.setState({
                shoppingList: shoppingListItems
            });
        }).catch(err => {
            console.log(err);
        });
    }

    // Reduces the amount
    function reduceAmount() {
        props.reduceAmount(props.shoppingItem._id);
    }

    return(
        <li key={props.shoppingItem._id} className="item">
                <input type="checkbox" onClick={checkItem} defaultChecked={props.shoppingItem.got}/>
                <>{checkIfItemIsChecked()}</>
                <button onClick={addToAmount} className="btn btn-success">Add</button>
                <button onClick={reduceAmount} className="btn btn-danger">Remove</button>
        </li>

    );
}
export default ShoppingListItem;