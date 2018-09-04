import React, {Component} from 'react';

export default class RetailerSearch extends Component {

    handleRetailerUpdate = () => {
        this.props.onSearchChange(this.newRetailer.value);
    };

    clearSearch = () => {
        this.props.onSearchChange('');
    };

    addRetailer = (retailer) => {
        if (this.newRetailer.value !== '') {
            this.props.onRetailerUpdate([retailer]);
            this.newRetailer.value = '';
        }
    };

    render() {
        return (
            <div className="sps-advanced-search sps-advanced-search--open">
                <div className="sps-list-toolbar sps-card">
                    <div className="sps-card__header">
                        <div className="sps-input-group">
                            <input name="retailer" value={this.props.searchRetailer} ref={input => this.newRetailer = input} onChange={this.handleRetailerUpdate} type="text" className="sps-form-control" placeholder="Search for a retailer by name"
                                   aria-label="Search for..."/>
                            <span className="sps-input-group__append">
                                            <button className="sps-btn sps-btn--icon" onClick={this.clearSearch} aria-label="Search">
                                                <i className="sps-icon sps-icon-x" aria-hidden="true" title="Search"/>
                                            </button>
                                        </span>
                        </div>
                    </div>
                </div>
                <div className="sps-card" aria-expanded="true" hidden={!this.props.searchRetailer}>
                    {this.props.retailerSearchResults && this.props.retailerSearchResults[0] ? [].concat(this.props.retailerSearchResults).sort((retailerA, retailerB) => retailerA.organization_name.toLowerCase().indexOf(this.props.searchRetailer.toLowerCase()) > retailerB.organization_name.toLowerCase().indexOf(this.props.searchRetailer.toLowerCase())).slice(0, 5).map(retailer => (

                            <div className="sps-card__body" key={retailer['id']}>
                                <button className="sps-btn sps-btn--default" onClick={this.addRetailer.bind(null, retailer)} style={{marginRight: .625 + 'rem'}}>
                                    <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="add to consolidation"/>
                                </button>
                                {retailer['organization_name']}
                            </div>
                        )) :
                        <div className="sps-card__body">
                            No search results for '{this.props.searchRetailer}' found
                        </div>
                    }
                </div>
            </div>
        )
    }
}

