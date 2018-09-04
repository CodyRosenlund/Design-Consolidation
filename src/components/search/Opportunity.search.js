import React, {Component} from 'react';
import { SpsButton } from "@spscommerce/ui-react";

import {getOpportunity} from '../../services/salesForce.services'

export default class OpportunitySearch extends Component {
    state = {
        processing: false
    };
    populateFromOpportunity = () => {
        if (this.opportunityID.value !== '') {
            let retailers = [];
            this.setState({'processing': true});

            getOpportunity(this.opportunityID.value).then(opportunityInfo => {
                Object.keys(opportunityInfo).map((retailerName, index) => {
                    // //skip the 'supplier' entry in Opportunity data as its the supplier/customer the retailers are connecting with
                    if (retailerName !== 'supplier') {
                        retailers = [...retailers,
                            {
                                "organization_name": retailerName,
                                "hubID": Object.values(opportunityInfo)[index][0].hub_id
                            }];
                    }
                });

                this.updateRetailerList(retailers);
            });
            this.opportunityID.value = '';
        }
    };

    updateRetailerList = (retailers) => {
        this.props.onRetailerUpdate(retailers);
        this.setState({'processing': false});

    }

    render() {
        return (
            <div className="sps-advanced-search sps-advanced-search--open">
                <div className="sps-list-toolbar sps-card">
                    <div className="sps-card__header">
                        <div className="sps-input-group">
                            <input name="retailer" ref={input => this.opportunityID = input} type="text" className="sps-form-control" placeholder="Populate from a salesForce Opportunity"
                                   aria-label="Search for..."/>
                            <span className="sps-input-group__append">
                                <SpsButton preset="default" message="Populate" className="sps-btn sps-btn--icon" onClick={this.populateFromOpportunity} spinning={this.state.processing}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

