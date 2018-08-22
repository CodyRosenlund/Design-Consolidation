import React from "react";
import {RetailerRow} from "./RetailerRow";

export const RetailerTable = ({retailers, documents, updateState}) => {
    let _newRetailer = "";
    let _newDocument = "";

    const addRetailer = () => {
        if (_newRetailer.value !== '') {
            updateState('retailers', [{
                "organization_name": _newRetailer.value,
                "documents": getDocuments()
            }]);
            _newRetailer.value = "";
        }
    };
    const getDocuments = () => {
        let temp = [];
        documents.map(document => (
            temp = temp.concat({'docType': document, 'design': ''})
            ));
        return temp;
    };
    const removeRetailer = (i) => {
        console.log(retailers);
        console.log('removing index: ' + i +" : " + retailers[i]);
        if (retailers.length > 0) {
            console.log(retailers.splice(i, 1)); // idk why but this line must stay for removing lines to work correctly
            retailers = retailers.splice(i, 1);
        }
        else {
            retailers = [];
        }
        console.log(retailers);
        updateState('retailers', retailers);
    };
    const addDocument = () => {
        // only allow documents that are 3 digits
        if (_newDocument.value.match(/^\d{3}$/)) {
            console.log(_newDocument);
            updateState('documents', _newDocument.value);
        }
    };

    return (
        <React.Fragment>
            Add Retailer
            <div className="sps-input-group sps-form-group">
                <input ref={input => _newRetailer = input} type="text" className="sps-form-control" placeholder="Enter retailer name" aria-label="Add retailer"/>
                <div className="sps-input-group__append">
                    <button onClick={addRetailer.bind(null, _newRetailer)} className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                        <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="Add document"/>
                    </button>
                </div>
            </div>
            Add Document
            <div className="sps-input-group sps-form-group">
                <input ref={input => _newDocument = input} type="text" className="sps-form-control" placeholder="3 digit document number" aria-label="Add document"/>
                <div className="sps-input-group__append">
                    <button onClick={addDocument.bind(null, _newDocument)} className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                        <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="Add document"/>
                    </button>
                </div>
            </div>
            {retailers.length > 0 && retailers[0]['organization_name'] !== '' ?
                <div className="sps-table-container">
                    <table className="sps-table">
                        <thead>
                        <tr role="row">
                            <th scope="col" role="columnheader" aria-sort="none" className="sps-table__header sps-table__header--toggle-column">
                            <span className="sps-table__header-cell-body sps-table__header-cell-body--toggle-cell">
                                <label className="sps-toggle">
                                    <span className="sr-only">Toggle All</span>
                                    <input type="checkbox" className="sps-toggle__input" aria-label="toggle a thing"/>
                                    <span className="sps-toggle__slider"/>
                                </label>
                            </span>
                            </th>
                            <th scope="col" role="columnheader" aria-sort="ascending" className="sps-table__header">
                                <span className="sps-table__header-cell-body" role="button" tabIndex="0">Retailer</span>
                            </th>
                            {documents.map((document) => (
                                <th key={document} scope="col" role="columnheader" aria-sort="none" className="sps-table__header">
                                    <span className="sps-table__header-cell-body" role="button" tabIndex="0">{document}</span>
                                </th>
                            ))}
                            <th scope="col" role="columnheader" aria-sort="none" className="sps-table__header sps-table--remove text-center">
                            <span className="sps-table__header-cell-body" role="button" tabIndex="0">
                                <i className="sps-icon sps-icon-x" aria-hidden="true" title="remove retailer"/>
                            </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody key="0">
                        {retailers.map((retailer, i) => (
                            <tr key={i} role="row" className="sps-table__row">
                                <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">
                                    <label className="sps-toggle">
                                        <span className="sr-only">Toggle Row</span>
                                        <input type="checkbox" className="sps-toggle__input" aria-label="toggle a thing"/>
                                        <span className="sps-toggle__slider"/>
                                    </label>
                                </td>
                                <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">
                                    {retailer['organization_name']}
                                </td>
                                {documents.map((document) => (
                                    <td key={document} role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">
                                        {!retailer.designs}
                                        <a >
                                            <i className="sps-icon sps-icon-status-ok" aria-hidden="true" title="Add document"/>{!retailer.designs === true}
                                        </a>
                                    </td>
                                ))}
                                <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell sps-table--remove">
                                    <button onClick={removeRetailer.bind(null, i)} className="sps-btn sps-btn--icon">
                                        <i className="sps-icon sps-icon-x" aria-hidden="true" title="remove retailer"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            : <div className="sps-card">
                    <div className="sps-card__body">
                        <div className="sps-zero-state">
                            <img className="sps-zero-state__image" src="" alt="Retailers"/>
                                <h1 className="sps-zero-state__heading">Add a Retailer</h1>
                                <h2 className="sps-zero-state__subheading">Search or add one manually to get started</h2>
                        </div>
                    </div>
                </div>}
        </React.Fragment>
    );
};