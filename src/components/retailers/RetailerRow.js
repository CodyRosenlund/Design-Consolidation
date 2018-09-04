import React, {Component} from 'react';

import DesignIcon from '../designs/DesignIcon'

export default class RetailerRow extends Component {
    baseDesignURL = 'https://commerce.spscommerce.com/transformation-designer/designs/';

    removeRetailerRow = () => {
        console.log("removing " + this.props.index);
        this.props.removeThisRetailer(this.props.index);
    };

    changeView = (key) => {
        this.props.changeView("/show/retailer/" + key);
    };

    render() {
        return (
            <React.Fragment>
                <tr key={this.props.index} role="row" className="sps-table__row" >
                    {/*<td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell">*/}
                        {/*<label className="sps-toggle">*/}
                            {/*<span className="sr-only">Toggle Row</span>*/}
                            {/*<input type="checkbox" className="sps-toggle__input" aria-label="toggle a thing"/>*/}
                            {/*<span className="sps-toggle__slider"/>*/}
                        {/*</label>*/}
                    {/*</td>*/}
                    <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell" onClick={this.changeView.bind(null, this.props.index)}>
                        {this.props.retailer['organization_name']}
                    </td>
                    {this.props.documents.map((document, i) => (
                        <td key={i} role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell" onClick={this.changeView.bind(null, this.props.index)}>
                            {this.props.retailer['documents'].filter(doc => doc.docType === document)
                                .map((doc, d) => (
                                    <DesignIcon key={d} thisDocument={doc} {...this.props}/>
                                ))
                            }
                        </td>

                    ))}
                    <td role="gridcell" className="sps-table__cell sps-table__cell--toggle-cell sps-table--remove">
                        <button onClick={this.removeRetailerRow.bind(null, this.props.i)} className="sps-btn sps-btn--icon">
                            <i className="sps-icon sps-icon-x" aria-hidden="true" title="remove retailer"/>
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}