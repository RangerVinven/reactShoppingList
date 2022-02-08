import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDom from "react-dom";
import ShoppingListContainer from "./components/ShoppingListContainer";

ReactDom.render(
    <ShoppingListContainer className="shoppingListContainer" />,
    document.getElementById("root")
);