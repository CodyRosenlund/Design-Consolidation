import React, {Component} from 'react';

export default class RetailerInfoPage extends Component {

    returnToMainPage = () => {
        console.log('returning to main view');
        this.props.setView("main");
    };

    handleRadioChange = (docType, design) => {
        this.props.retailer.documents.filter((document) => document.docType === docType)
            .map(document => {
                document.selectedDesign = design;
            });
        // this.props.retailer.documents[docKey].selectedDesign = design;
        this.props.onRetailerUpdate([this.props.retailer])
    };


    render() {
        return (
            <React.Fragment>
                <header className="sps-header">
                    <button type="button" className="sps-btn sps-btn--link" onClick={this.returnToMainPage}>
                        <i className="sps-icon sps-icon-arrow-left-circle" aria-hidden="true"/>
                        Back to Consolidation
                    </button>
                    <div className="sps-page-title">
                        <h1 className="sps-page-title__main">{this.props.retailer.organization_name}</h1>
                    </div>
                </header>
                <div className={"sps-card"}>
                    {this.props.documents.map((document, i) => (
                        this.props.retailer['documents'].filter(doc => doc.docType === document)
                            .map((doc, d) => (
                                <div key={d}>
                                    <div className="sps-card__body">
                                        <h3>
                                            {doc.docType}
                                        </h3>
                                    </div>

                                    <div className="sps-card__body">
                                        <form>
                                            <fieldset className="sps-form-group">
                                                {doc.designs.length > 0 ?
                                                    doc.designs.map((design, key) => (
                                                        <div key={key} className="sps-custom-control sps-custom-radio">
                                                            <input type="radio" id={design} name={design} className="sps-custom-control__input radio-input"
                                                                   onChange={this.handleRadioChange.bind(null, doc.docType, design.split("/")[design.split("/").length - 1])} checked={design.split("/")[design.split("/").length - 1] === doc.selectedDesign}/>
                                                            <label className="sps-custom-control__label" htmlFor={design}>
                                                                {design.split("/")[doc.designs[0].split("/").length - 1]}
                                                            </label>
                                                        </div>
                                                    ))
                                                    : <div>
                                                        No designs found
                                                    </div>
                                                }
                                            </fieldset>
                                        </form>
                                    </div>

                                </div>
                            ))
                    ))}
                </div>
            </React.Fragment>
        )
    }
}