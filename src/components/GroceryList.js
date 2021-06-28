import React, { Component } from 'react'
import "./Grocery.css"
import PropTypes from "prop-types"
import Button from '../Button'

export class GroceryList extends Component {
    state={
        canEdit:false,
        editInput:this.props.item.grocery
    }

    mixFunc=(_id)=>{
        this.setState({
            canEdit:!this.state.canEdit
        })
        this.props.handleEditByID(_id, this.state.editInput)
    }

    handleGroceryOnChange1 = (event)=>{
        this.setState({
            editInput:event.target.value
        })
    }
    // componentDidUpdate(){
    //     let input = document.getElementByID(this.props.inputID)
    //     if(input){
    //         input.focus()
    //     }
    // }
    render() {
    const {grocery, _id, purchased} = this.props.item
    const {handleDeleteByID, handlePurchasedByID, inputID} = this.props
        return (
            <div className = "grocerylist-div">
                {
                    this.state.canEdit ?
                    <input
                    onChange = {this.handleGroceryOnChange1}
                    type="text"
                    value={this.state.editInput}
                    name="editInput" 
                    id={inputID}/>
                    : <li className={`li-style ${purchased && "li-style-purchased"}`}>{grocery}</li>
                }
                {this.state.canEdit
                    ?
                    <Button 
                    buttonName="Submit"
                    func = {()=>this.mixFunc(_id)}
                    id="edit-button"
                    _id={_id} 
                    />
                    :
                    <Button 
                    id="edit-button"
                    _id={_id}
                    func = {()=>this.setState({
                        canEdit:!this.state.canEdit
                    })}
                    buttonName = "Edit"
                    />
                }
                <Button 
                buttonName = "Purchase"
                id="purchase-button"
                func = {()=>handlePurchasedByID(_id, purchased)}
                _id={_id}
                />
                <Button
                buttonName = "Delete"
                id="delete-button"
                func = {()=>handleDeleteByID(_id)}
                _id={_id} />
            </div>
        )
    }
}

GroceryList.propTypes = {
    item:PropTypes.object.isRequired,
    handleDeleteByID:PropTypes.func.isRequired,
    handlePurchasedByID:PropTypes.func.isRequired,
    handleEditByID:PropTypes.func.isRequired
}

export default GroceryList;
