import React, {Component} from "react";
import {RetailerTable} from "../components/retailers/RetailerTable"
import {RetailerSearch} from "../components/search/RetailerSearch"
import {RetailerRow} from "../components/retailers/RetailerRow";



export default class HomePage extends Component {
    state = {
        opportunities: [],
        searchRetailer: '',
        retailerSearchResults: [],
        retailers: [],
        documents: [810,850,856],
    };


    updateState = (key, value) => {

        if (value === null || value === undefined) return;

        if (key === 'retailers') {
            // dont allow duplicates
            for (let i = 0; i < this.state.retailers.length; i++) {
                console.log("retailer name: "+this.state.retailers[i].organization_name);
                if (!value.some(item => this.state.retailers[i].organization_name === item.organization_name)) {
                    value = [this.state.retailers[i], ...value];
                    // this.addDesigns();
                }
            }

            value = value.sort((a, b) => {return a.organization_name.toLowerCase() > b.organization_name.toLowerCase()});

        }
        else if (key === 'retailerSearchResults') {
            let tempValues = [];
            searchResultLoop:
            for (let s = 0; s < value.length; s++) {
                for (let i = 0; i < this.state.retailers.length; i++) {
                    if (this.state.retailers[i].organization_name === value[s].organization_name) {
                        continue searchResultLoop;
                    }
                }
                tempValues = [...tempValues, value[s]]
            }
            value = tempValues
        }
        else if (key === 'documents') {
            // dont allow duplicates
            for (let i = 0; i < this.state.documents.length; i++) {
                if (this.state.documents[i] === value) {
                    return;
                }
            }
            value = [...this.state.documents, value];
        }


        // this.setState(prevState => {
        //     return {
        //         [key]: value,
        //     }
        // });
        // console.log(this.state);
        // console.log(...this.state.retailers);

        this.setState(
            { [key]: value },
            () => {
                console.log(this.state);
                console.log(...this.state.retailers);
            }
        );
    };

    // componentDidMount() {
    // hopefully we can use this in the future
    // const sfEndpoint = 'https://op.dev.spsc.io/retailerData/';
    // const opportunitityId = '0060g00000ue66R';
    // const url = sfEndpoint + opportunitityId;
    //
    // const resp = await(url);
    // const data = resp.json();
    // this.setState({
    //     opportunities: data
    // });
    // }

    render() {
        return (
            <div className="sps-body">
                <aside className="sps-body__sidebar sps-body__sidebar--350">
                    <div className="sps-card">
                        <div className="sps-card__body">
                            <RetailerSearch retailer={this.state.searchRetailer} retailerSearchResults={this.state.retailerSearchResults} updateState={this.updateState}/>

                        </div>
                    </div>
                </aside>
                <section className="sps-main-content">
                    <div className="sps-row-layout sps-row-layout--collapse-200">
                        <div className="sps-card">
                            <div className="sps-card__body">
                                    Placeholder
                                <div className="sps-input-group sps-form-group">
                                    <input type="text" className="sps-form-control" placeholder="Placeholder" aria-label="Add document"/>
                                    <div className="sps-input-group__append">
                                        <button className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                                            <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="Add document"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sps-card">
                            <div className="sps-card__body">
                                Placeholder
                                <div className="sps-input-group sps-form-group">
                                    <input type="text" className="sps-form-control" placeholder="Placeholder" aria-label="Add document"/>
                                    <div className="sps-input-group__append">
                                        <button className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                                            <i className="sps-icon sps-icon-plus-sign" aria-hidden="true" title="Add document"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sps-card">
                            <div className="sps-card__body">
                                Placeholder
                                <div className="sps-input-group sps-form-group">
                                    <input type="text" className="sps-form-control" placeholder="Placeholder" aria-label="Search for..."/>
                                    <div className="sps-input-group__append">
                                        <button className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                                            <i className="sps-icon sps-icon-search" aria-hidden="true" title="Search"/>
                                        </button>
                                    </div>
                                    <input type="text" className="sps-form-control" placeholder="Placeholder" aria-label="Search for..."/>
                                    <div className="sps-input-group__append">
                                        <button className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                                            <i className="sps-icon sps-icon-search" aria-hidden="true" title="Search"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sps-card">
                        <div className="sps-row-layout sps-row-layout--collapse-500">
                            <div className="sps-card">
                                <div className="sps-card__body">
                                    <RetailerTable retailers={this.state.retailers} documents={this.state.documents} updateState={this.updateState}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
