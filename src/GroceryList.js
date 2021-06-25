import React from "react";

const GroceryList = (props) => {
    return (
        <table>
            <tr>
                <th>Grocery Item</th>
                <th>Purchased</th>
                <th>Date</th>
            </tr>

            <tr>
                <td></td>
                <td><button className="yes">Yes</button> | <button className="no">No</button></td>
                <td></td>
            </tr>
        </table>
    );
};

export default GroceryList;
