import React, {Component} from 'react';

import RetailerRow from './RetailerRow'

export default class RetailerTable extends Component {

    removeRetailer = (i) => {
        let tempList = this.props.retailers;
        if (this.props.retailers.length > 0) {
            console.log(this.props.retailers.splice(i, 1)); // idk why but this line must stay for removing retailers to work correctly
            tempList = this.props.retailers.splice(i, 1);
            this.props.onRetailerUpdate(tempList);
        }
    };

    changeView = (view) => {
        this.props.setView(view);
    };

    render() {
        return (
            <React.Fragment>
                {this.props.retailers.length > 0 && this.props.retailers[0]['organization_name'] !== '' ?
                    <div className="sps-table-container">
                        <table className="sps-table">
                            <thead>
                            <tr role="row">
                                {/*<th scope="col" role="columnheader" aria-sort="none" className="sps-table__header sps-table__header--toggle-column">*/}
                            {/*<span className="sps-table__header-cell-body sps-table__header-cell-body--toggle-cell">*/}
                                {/*<label className="sps-toggle">*/}
                                    {/*<span className="sr-only">Toggle All</span>*/}
                                    {/*<input type="checkbox" className="sps-toggle__input" aria-label="toggle a thing"/>*/}
                                    {/*<span className="sps-toggle__slider"/>*/}
                                {/*</label>*/}
                            {/*</span>*/}
                                {/*</th>*/}
                                <th scope="col" role="columnheader" aria-sort="ascending" className="sps-table__header">
                                    <span className="sps-table__header-cell-body" role="button" tabIndex="0">Retailer</span>
                                </th>
                                {this.props.documents.map((document) => (
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
                            <tbody>
                            {this.props.retailers.map((retailer, i) => (
                                <RetailerRow key={i} removeThisRetailer={this.removeRetailer} changeView={this.changeView} retailer={retailer} index={i} {...this.props} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                    : <div className="sps-card">
                        <div className="sps-card__body">
                            <div className="sps-zero-state">
                                <h1 className="sps-zero-state__heading">Add a Retailer</h1>
                                <h2 className="sps-zero-state__subheading">Search or add one manually to get started</h2>
                            </div>
                        </div>
                    </div>}
            </React.Fragment>
        )
    }
}