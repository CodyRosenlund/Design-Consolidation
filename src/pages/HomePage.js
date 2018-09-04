import React, {Component} from "react";
import {SpsButton, SpsCard} from "@spscommerce/ui-react";

import {searchCompany, searchDesigns} from "../services/TransformationDesigner.service";
import RetailerSearch from "../components/search/Retailer.search";
import RetailerTable from "../components/retailers/RetailerTable";
import {addAllDocs, addOneDoc} from "../components/designs/design.functions";
import OpportunitySearch from "../components/search/Opportunity.search";
import NewRetailerPage from "./NewRetailerPage";
import RetailerInfoPage from "./RetailerInfoPage";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            pageView: 'main',
            opportunities: [],
            searchRetailer: '',
            selectedRetailer: '',
            retailerSearchResults: [], // retailers returned from TD by search term
            retailers: [], //retailers added/displayed in the table
            documents: ['810', '850', '856'], //starting docs
            convertedMatrices: [ //company IDs in TD for the matrices Fanning has uploaded
                {'docType': '810', 'TD_ID': '47497557979037628499774595213941782168'},
                {'docType': '846', 'TD_ID': '38371545301609124159076970555063815828'},
                {'docType': '850', 'TD_ID': '188627516988758957327651228808290206826'},
                {'docType': '855', 'TD_ID': '215042920332973928157985077354992509624'},
                {'docType': '856', 'TD_ID': '339268377377602878437740954120607426978'},
                {'docType': '860', 'TD_ID': '169689538730737636479951570551130658902'},
            ],
        };
    }

    setPage = (page) => {
        this.setState({'pageView': page});
    };

    componentDidMount() {
        console.log("mounting");

        //load design names in to state.convertedMatrices
        this.state.convertedMatrices.map(convertedMatrixObject => {
            if (convertedMatrixObject.designs === undefined) {
                searchDesigns(convertedMatrixObject.TD_ID).then(designs => {
                    convertedMatrixObject.designs = designs;
                    this.setState({'convertedMatrices': this.state.convertedMatrices},
                        () => {

                            console.log(this.state.convertedMatrices);
                        });
                });
            }
        });
        console.log("did mount");
    }

    handleRetailerSearchChange = (newRetailerSearch) => {
        this.setState({'searchRetailer': newRetailerSearch},
            () => {
                this.searchRetailer();
            });
    };

    searchRetailer = () => {
        if (this.state.searchRetailer === '') {
            this.setState({'retailerSearchResults': []});
        } else {
            searchCompany(this.state.searchRetailer).then(retailers => {
                this.setState({'retailerSearchResults': retailers});
            });
        }
    };

    handleRetailerListChange = (newRetailer) => {
        console.log(newRetailer);
        let newRetailerList = newRetailer;
        // dont allow duplicates
        for (let i = 0; i < this.state.retailers.length; i++) {
            if (!newRetailer.some(item => this.state.retailers[i].organization_name.toLowerCase() === item.organization_name.toLowerCase())) {
                //add it to the retailer object so it renders
                newRetailerList = [this.state.retailers[i], ...newRetailerList];
            }
        }
        //sort alphabetically in lowercase
        newRetailerList = newRetailerList.sort((a, b) => {
            return a.organization_name.toLowerCase() > b.organization_name.toLowerCase()
        });
        //check for each retailers' docs/designs, if they do not have them then add. Then setState
        addAllDocs(newRetailerList, this.state.documents, this.state.convertedMatrices).then(retailers => {
            this.setState({
                    'retailers': retailers,
                    'pageView': "main"
                },
                () => {
                    console.log(this.state);
                });
        });
    };

    handleDocumentListChange = (newDocument) => {
        // dont allow duplicates
        for (let i = 0; i < this.state.documents.length; i++) {
            if (this.state.documents[i] === newDocument) {
                return;
            }
        }
        //add this new doc to all retailers
        addOneDoc(this.state.retailers, newDocument).then(retailers => {
            this.setState(
                {
                    'retailers': retailers,
                    'documents': [...this.state.documents, newDocument]
                },
                () => {
                    console.log(this.state);
                });
        });
    };

    consolidate = () => {
        this.state.documents.map(document => {
            let consolidateDesigns = [];
            this.state.retailers.map(retailer => {
                retailer.documents.map(doc => {
                    if (doc.docType === document && doc.selectedDesign !== '') {
                        consolidateDesigns = [...consolidateDesigns, doc.selectedDesign.split("/")[doc.selectedDesign.split("/").length - 1]]
                    }
                });
            });
            console.log("consolidate designs - doc: " + document + " Designs: " + consolidateDesigns);

            alert("consolidate designs - doc: " + document + " Designs: " + consolidateDesigns);
        });
    };

    addDocument = () => {
        if (this.newDocument.value.match(/^\d{3}$/)) {
            this.handleDocumentListChange(this.newDocument.value);
            this.newDocument.value = '';
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.pageView === 'main' ?
                    <div className="sps-body">
                        <aside className="sps-body__sidebar sps-body__sidebar--400">
                            <div className="sps-card">
                                <div className="sps-card__body">
                                    <OpportunitySearch onRetailerUpdate={this.handleRetailerListChange}/>
                                    <h4 className={'h5-line'}>
                                <span className={'span-line'}>
                                    OR
                                </span>
                                    </h4>
                                    <RetailerSearch onSearchChange={this.handleRetailerSearchChange} onRetailerUpdate={this.handleRetailerListChange} {...this.state} />
                                </div>
                            </div>
                        </aside>
                        <section className="sps-main-content">
                            {/*<div className="sps-row-layout sps-row-layout--collapse-200">*/}
                            {/*<div className="sps-card">*/}
                            {/*<div className="sps-card__body">*/}
                            {/*<i className="sps-icon sps-icon-group stats-icon"/>*/}
                            {/*<span className={"stats-number"}>*/}
                            {/*{this.state.retailers.length}*/}
                            {/*</span>*/}
                            {/*<h2>Retailers</h2>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="sps-card">*/}
                            {/*<div className="sps-card__body">*/}
                            {/*<i className="sps-icon sps-icon-file-solid stats-icon"/>*/}
                            {/*<span className={"stats-number"}>*/}
                            {/*{this.state.retailers.length}*/}
                            {/*</span>*/}
                            {/*<h2>Documents</h2>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="sps-card">*/}
                            {/*<div className="sps-card__body">*/}
                            {/*<i className="sps-icon sps-icon-star-outline stats-icon"/>*/}
                            {/*<span className={"stats-number"}>*/}
                            {/*{this.state.retailers.length} %*/}
                            {/*</span>*/}
                            {/*<h2>Coverage</h2>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            <div className={'sps-row-layout sps-row-layout--collapse-400'}>
                                <SpsCard>
                                    <div className={"sps-row-layout"}>
                                        <SpsButton preset="default" message="Add Retailer" onClick={() => this.setPage("addRetailer")}/>
                                        <div className="sps-input-group sps-form-group">

                                            <input ref={input => this.newDocument = input} type="text" className="sps-form-control" placeholder="3 digit doc #" aria-label="Add document"/>
                                            <div className="sps-input-group__append">
                                                <button onClick={this.addDocument.bind(null, this.newDocument)} className="sps-btn sps-btn--icon" type="button" aria-label="Search">
                                                    Add Document
                                                </button>
                                            </div>
                                        </div>
                                        <SpsButton preset="confirm" message="Consolidate" onClick={this.consolidate.bind(null)}/>
                                    </div>
                                </SpsCard>
                            </div>
                            <div className="sps-card">
                                <div className="sps-row-layout sps-row-layout--collapse-500">
                                    <div className="sps-card">
                                        <div className="sps-card__body">
                                            <RetailerTable setView={this.setPage} onRetailerUpdate={this.handleRetailerListChange} {...this.state}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    : this.state.pageView === 'addRetailer' ?
                        <NewRetailerPage setView={this.setPage} onRetailerUpdate={this.handleRetailerListChange} {...this.state} />
                        :
                        <RetailerInfoPage retailer={this.state.retailers[this.state.pageView.split('/')[this.state.pageView.split('/').length - 1]]} setView={this.setPage} onRetailerUpdate={this.handleRetailerListChange} {...this.state} />
                }
            </React.Fragment>
        );
    }
}

export default HomePage