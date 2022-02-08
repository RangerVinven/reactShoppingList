import React from "react";
import ShoppingListItem from "./ShoppingListItem";

function ShoppingList(props) {
    return (
        <ul>
            {props.shoppingList.map(item => (
                <ShoppingListItem
                key={item._id}
                shoppingItem={item}
                gotItem={props.gotItem}
                incrementAmount={props.incrementAmount}
                reduceAmount={props.reduceAmount} />
            ))}
        </ul>
    )
}

export default ShoppingList;