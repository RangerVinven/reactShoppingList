import React from "react";
import "./ShoppingListInput.css";

function ShoppingListInput(props) {

    function addShoppingItem() {
        props.addItem(
            document.getElementsByClassName("itemNameInput")[0].value,
            Number(document.getElementsByClassName("itemAmountInput")[0].value)
        );
    }

    return(
        <>
            <input className="itemNameInput" type="text" placeholder="Item Name"/>
            <input className="itemAmountInput" type="number" placeholder="Amount"/>
            <button onClick={addShoppingItem} className="btn btn-warning">Add</button>
        </>
    );
}
export default ShoppingListInput;