import React from "react";

export const RetailerRow = ({retailer}) => {
    // const columns = [];
    // let i;
    // for (i = 0; i < retailer; i++) {
    //     columns.push(<td key={i}>{retailer[i]}</td>)
    // }
    return (
        <tr role="row" className="sps-table__row sps-table__row--selected">
            <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">
                <label className="sps-toggle">
                    <span className="sr-only">Toggle Row</span>
                    <input type="checkbox" className="sps-toggle__input" aria-label="toggle a thing"/>
                    <span className="sps-toggle__slider"/>
                </label>
            </td>
            <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">
                {retailer}
            </td>
        </tr>
    )
};