import React from "react";
import axios from 'axios';
import {searchCompany} from "../../services/TransformationDesigner.services";


export const RetailerSearch = ({retailer, retailerSearchResults, updateState}) => {
    let _retailer = "";

    const clearRetailer = () => {
        updateState('searchRetailer', '');
    };
    const handleRetailerUpdate = () => {
        _retailer = _retailer.value;
        updateState('searchRetailer', _retailer);
        searchRetailer(_retailer);
    };
    const addRetailer = (retailer) => {
        updateState('retailers', [retailer]);
        //update the search list so the just added retailer is not in it
        _retailer = _retailer.value;
        searchRetailer(_retailer);
    };
    const searchRetailer = () => {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6IjMxNjY1MzEzNDI5OTYwMjQ1NzQxNDUwNzI0MDA4NjAyMzU2MzI1MiIsImVtYWlsIjoiY3Jvc2VubHVuZEBzcHNjb21tZXJjZS5jb20iLCJmaXJzdF9uYW1lIjoiQ29keSIsImxhc3RfbmFtZSI6IlJvc2VubHVuZCIsImF2YXRhcl9pbWFnZV91cmwiOiIiLCJ1c2VyX2lkIjoiMjg0NDQyNzQ4MjgxODI2OTI2MzUzMDMyODk3OTAzNzQyNzIwODQxIiwib3JnX2lkIjoiMTU3NjI3MTQxOTc5NjEyOTE1NjI2MzMzNTc3MTA1MTExODU0MjMyIiwib3JnX25hbWUiOiJTUFMgQ29tbWVyY2UiLCJleHAiOjE1MzQ5NjY5MzQsInZlciI6IjEiLCJlbnYiOiJwcm9kIiwidXJpIjoiaHR0cHM6Ly9pZC5zcHNjLmlvIiwiaWF0IjoxNTM0ODgwNTM0fQ.VUWLmD5qrxtilQ9nasZyV4YT0Lov6FNWotwlM9uJfASdM6ryKos6KAx63Owp-9HhsH9jYcdThLTBb-HkMrYtQCEqnZvuZwSNDo7KtiHEEahduNPH63GhhGIf79MVDd-SVdVtGUHA6Yu0-n2dxtlobMwE6OIjFzBFoB0lPBohIsSJKpmUiLTB8ow6XUtY7FVJ_CYm27ejqGTwmpV_aDpBvOAk2lbpSMSK7-Sb8dI-26300PY_AKYTLa928vgAKT1H3aTevppZdomamhs15TxXDCYe-6BbrJ6Q1FeHfGM4FzB1uzrCOdoS6o_ziPkNixfiZ_iOartPnW-ZQ8NKbMwZTQ';
        const config = {
            headers: {'Authorization': "bearer " + token}
        };

        const baseURL = 'https://id.spsc.io/identity/v2/organizations/?search=';
        axios.get(baseURL + _retailer, config)
            .then((response) => {
                updateState('retailerSearchResults', response.data.results);
            }).catch((error) => {
            console.log(error)
        });
        console.log(retailerSearchResults);
    };
    // const searchRetailer = () => {
    //
    //     console.log(_retailer)
    //     let searchResults = searchCompany({_retailer, updateState}).then(response => {
    //         console.log(response);
    //         updateState('retailerSearchResults', response);
    //         console.log(retailerSearchResults);
    //     });
    //
    //     // console.log(searchResults);
    // };

    return (
        <div className="sps-advanced-search sps-advanced-search--open">
            <div className="sps-list-toolbar sps-card">
                <div className="sps-card__header">
                    <div className="sps-card__half-group-wrapper">
                        <div className="sps-card__half-group--1">
                            <div className="sps-input-group">
                                <input name="retailer" value={retailer} ref={input => _retailer = input} onChange={handleRetailerUpdate} type="text" className="sps-form-control" placeholder="Search for a retailer by name" aria-label="Search for..."/>
                                <span className="sps-input-group__append">
                                    <button className="sps-btn sps-btn--icon" onClick={clearRetailer} aria-label="Search">
                                        <i className="sps-icon sps-icon-x" aria-hidden="true" title="Search"/>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sps-card" aria-expanded="true" hidden={!retailer}>
                {retailerSearchResults && retailerSearchResults[0] ? [].concat(retailerSearchResults).sort((retailerA, retailerB) => retailerA.organization_name.toLowerCase().indexOf(retailer.toLowerCase()) > retailerB.organization_name.toLowerCase().indexOf(retailer.toLowerCase())).slice(0, 5).map(retailer => (

                        <div className="sps-card__body" key={retailer['id']}>
                            <button onClick={addRetailer.bind(null, retailer)} className="sps-btn sps-btn--default" style={{marginRight: .625 + 'rem'}}>
                                <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="add to consolidation"/>
                            </button>
                            {retailer['organization_name']}
                        </div>
                    )) :
                    <div className="sps-card__body">
                        No search results for '{retailer}' found
                    </div>
                }
            </div>
        </div>


    );
};
