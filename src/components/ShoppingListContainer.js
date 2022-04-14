import React from "react";
import "../App.css";

import Header from "./Header";
import ShoppingList from "./ShoppingList";
import ShoppingListInput from "./ShoppingListInput";

class ShoppingListContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            shoppingList: []
        };
        
        this.removeFromDatabase = this.removeFromDatabase.bind(this);
    }

    // Updates the state to what's in the database
    componentDidMount() {
        this.getShoppingList();
    }

    getShoppingList = () => {
        const axios = require('axios').default;
        axios.get("https://daniels-shopping-list-backend.herokuapp.com/v1/getShoppingList").then(response => {
            const shoppingListItems = response.data;

            this.setState({
                shoppingList: shoppingListItems
            });
        }).catch(err => {
            console.log(err);
        });
    }

    addToDatabase = (name, itemAmount, itemId) => {
        const axios = require('axios').default;
        axios.post("https://daniels-shopping-list-backend.herokuapp.com/v1/addToDatabase", {
            _id: itemId,
            amount: itemAmount,
            itemName: name,
            got: false
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    removeFromDatabase = itemId => {
        const axios = require('axios').default;

        axios.delete("https://daniels-shopping-list-backend.herokuapp.com/v1/removeShoppingItem", {
            _id: itemId
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    // Adds an item to the list
    addToList = (name, itemAmount) => {
        
        // Makes a copy of the shopping list in the state
        const newShoppingList = [...this.state.shoppingList];

        // Adds the new item to the shoppinglist
        newShoppingList.push({
            _id: Date.now(),
            amount: itemAmount,
            itemName: name,
            got: false
        });

        // Updates the state to use the newShoppingList
        this.setState({
            shoppingList: newShoppingList
        }, () => {
            this.addToDatabase(name, itemAmount, newShoppingList[newShoppingList.length-1]._id);
        });

    }

    // Changes the result of "got" to the opposite (called when the checkbox is pressed)
    changeGot = itemId => {
        
        // Makes a copy of the shopping list
        const newShoppingList = [...this.state.shoppingList];

        // Loops through the newShoppingList and updates the "got" of the selected item
        newShoppingList.forEach(item => {
            if(item._id === itemId) {
                item.got = !item.got;

                // Calls the api to update the amount in the database
                const axios = require('axios').default;
                
                if(item.got) {
                    axios.put(`https://daniels-shopping-list-backend.herokuapp.com/v1/changeGot/:${itemId}/true`).then(response => {
                    console.log("Called");
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    axios.put(`https://daniels-shopping-list-backend.herokuapp.com/v1/changeGot/:${itemId}/false`).then(response => {
                    console.log("Called");
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        });

        // Updates the current state
        this.setState({
            shoppingList: newShoppingList
        });
        console.log(Date.now());
    }

    // Adds 1 to the amount
    incrementAmount = (id) => {
        // Makes a copy of the shopping list
        const newShoppingList = [...this.state.shoppingList];

        // Loops through and adds 1 to the amount
        newShoppingList.forEach(item => {
            if(item._id === id) {
                item.amount++;

                // Calls the api to update the amount in the database
                const axios = require('axios').default;
                axios.put(`https://daniels-shopping-list-backend.herokuapp.com/v1/changeAmount/:${id}/${item.amount}`).then(response => {
                    console.log("Called");
                }).catch(err => {
                    console.log(err);
                });
            }
        });

        this.setState({
            shoppingList: newShoppingList
        });
    }

    // Removes an item from the shoppingList
    removeItemFromList(shoppingList, index) {
        return shoppingList.splice(index, 1);
    };

    // Reduce the amounts by 1
    reduceAmount = id => {
        // Makes a copy of the shopping list
        let newShoppingList = [...this.state.shoppingList];

        newShoppingList.forEach(function(item, index) {

            // Makes sure you're only affecting the newShoppingList you want
            if(item._id === id) {

                // Checks if the amount won't take it to 0, if it does, then remove it from the list
                if(item.amount > 1) {
        
                    item.amount--;

                    // Calls the api to update the amount in the database
                    const axios = require('axios').default;
                    axios.put(`https://daniels-shopping-list-backend.herokuapp.com/v1/changeAmount/:${id}/${item.amount}`).then(response => {
                        console.log("Called");
                    }).catch(err => {
                        console.log(err);
                    });
                
                } else {
                    newShoppingList.splice(index, 1);
                    
                    const axios = require('axios').default;
                    axios.delete(`https://daniels-shopping-list-backend.herokuapp.com/v1/removeShoppingItem/:${id}`).then(response => {
                        console.log(response);
                        console.log(id);
                        
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }

        });

        this.setState({
            shoppingList: newShoppingList
        });

    }

    render() {
        return (
            <>
                <Header />
                <ShoppingListInput addItem={this.addToList} />
                <ShoppingList
                shoppingList={this.state.shoppingList}
                gotItem={this.changeGot}
                incrementAmount={this.incrementAmount}
                reduceAmount={this.reduceAmount} />
            </>
        );
        
    }
}

export default ShoppingListContainer;