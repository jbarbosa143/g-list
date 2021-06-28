import React, { Component } from 'react'
import GroceryList from "./GroceryList";
import axios from "axios"
import "./Grocery.css";
import Button from "../Button"

const URL = "http://localhost:3001"

export class Grocery extends Component {
    state ={
        groceryList: [],
        groceryInput: '',
        error:false,
        errorMessage:""
    }

    async componentDidMount(){
        try {
            let allGroceries = await axios.get(
                `${URL}/api/grocery/get-all-groceries`
            );
            this.setState({
                groceryList:allGroceries.data.payload
            })
            console.log(this.state.groceryList);
        } catch (e) {
            console.log(e);
        }
    }    
    handleGroceryOnChange = (event)=>{
        this.setState({
            groceryInput:event.target.value,
            errorMessage:""
        })
    }
    handleOnSubmit = async (event)=>{
        event.preventDefault()
        let found = false
        if(this.state.groceryInput !== ""){
            this.state.groceryList.forEach((item)=>{
                if(item.grocery.toLowerCase() === this.state.groceryInput.toLowerCase()){
                    found=true
                }
            })
            if (found){
                this.setState({
                    error:true,
                    errorMessage:"This item already exists"
                })
            } else {
                try {
                    let createdGrocery = await axios.post(
                        `${URL}/api/grocery/create-grocery`,
                        {
                            grocery:this.state.groceryInput
                        }
                    ) 
                    let newArray = [
                        ...this.state.groceryList, createdGrocery.data.payload
                    ]
                    this.setState({
                        groceryList:newArray,
                        groceryInput:"",
                        error:false,
                        errorMessage:""
                    })
                } catch (error){
                    console.log(error)
                }
            }
        } else {
            this.setState({
                error:true,
                errorMessage:"Cannot add empty item",
                groceryList:this.state.groceryList
            })
        }
    }

    handleDeleteByID = async (_id)=>{
        try {
            let deletedGrocery = await axios.delete(`${URL}/api/grocery/delete-grocery-by-id/${_id}`)
            let filteredArray = this.state.groceryList.filter((item)=>item._id !== deletedGrocery.data.payload._id)
            this.setState({
                groceryList:filteredArray
            })
        } catch (error) {
            console.log(error)
        }
    }

    handlePurchasedByID = async (_id, purchased)=>{
        try {
            let updatedPurchase = await axios.put(`${URL}/api/grocery/update-grocery-by-id/${_id}`, {purchased:!purchased})
            console.log(updatedPurchase)
            let purchasedItem = this.state.groceryList.map((item)=>{
                if(item._id === updatedPurchase.data.payload._id){
                    item.purchased = updatedPurchase.data.payload.purchased
                }
                return item
            })
            this.setState({
                groceryList:purchasedItem
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleEditByID = async(_id, editInput)=>{
        try {
            let editedItem = await axios.put(`${URL}/api/grocery/update-grocery-by-id/${_id}`, {grocery:editInput})
            let editItem = this.state.groceryList.map((item)=>{
                if(item._id === editedItem.data.payload._id){
                    item.grocery=editInput
                }
                return item
            })
            this.setState({
                groceryList:editItem
            })
        } catch (error) {
            console.log(error)
        }
    }

    sortByDate = async(date)=>{
        try {
            let sorted = await axios.get(`${URL}/api/grocery/get-all-groceries?date=${date}`)
            this.setState({
                groceryList:sorted.data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    sortByPurchased = async(purchased)=>{
        try {
            let sorted = await axios.get(`${URL}/api/grocery/sort-by-purchased?purchased=${purchased}`)
            this.setState({
                groceryList:sorted.data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    render() {
        return (
            <div>
            <div className="form-div">
                <form onSubmit={this.handleOnSubmit}>
                    <input
                    name="groceryInput"
                    type="text"
                    onChange={this.handleGroceryOnChange}
                    value={this.state.groceryInput}
                    />
                    <button type="submit">Submit</button>
                    <br />
                    <span style={{color:"red"}}>{this.state.error && this.state.errorMessage}</span>
                </form>
            </div>
            <div className="sorting">
                <ul>
                    <li>
                    <Button 
                        func = {()=>this.sortByDate("desc")}
                        buttonName = "Sort by Date - Newest to oldest"/>
                    </li>
                    <li>
                        <Button 
                        func = {()=>this.sortByDate("ascending")}
                        buttonName = "Sort by Date - Oldest to newest"/>
                    </li>
                    <li>
                    <Button 
                        func = {()=>this.sortByPurchased("true")}
                        buttonName = "Sort by Purchased"/>
                    </li>
                    <li>
                        <Button 
                        func = {()=>this.sortByPurchased("false")}
                        buttonName = "Sort by Not Purchased"/>
                        
                    </li>
                </ul>
            </div>
                <div className="grocery-div">
                    <ul>
                        {this.state.groceryList.map((item) => {
                        return <GroceryList 
                            key={item._id} 
                            item={item} 
                            handleDeleteByID={this.handleDeleteByID}
                            handlePurchasedByID={this.handlePurchasedByID}
                            handleEditByID={this.handleEditByID}
                            inputID={item._id}/>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Grocery;