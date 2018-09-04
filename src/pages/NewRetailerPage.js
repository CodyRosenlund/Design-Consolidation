import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {SpsButton} from "@spscommerce/ui-react";

class newRetailerPage extends Component {
    state = {
        'newRetailerName': '',
        'hubID': '',
        'validName': true,
    };

    saveRetailer = () => {
        if (this.newRetailer.value !== '') {
            console.log("how about here?");
            this.props.onRetailerUpdate([{
                "organization_name": this.newRetailer.value,
                "hubID": this.hubid.value,
            }]);
        }
    };

    returnToMainPage = () => {
        this.props.setView("main");
    };

    checkRetailerName = () => {
        console.log(this.newRetailer.value,);
        this.setState({'newRetailerName': this.newRetailer.value},
            () => {
                if (!this.props.retailers.some(retailer => retailer.organization_name.toLowerCase() === this.state.newRetailerName.toLowerCase())) {
                    this.setState({
                        'validName': true
                    });
                } else {
                    this.setState({
                        'validName': false
                    });
                }
            });

    };

    render() {
        return (
            <div>
                <header className="sps-header">
                    <div className="sps-page-title">
                        <h1 className="sps-page-title__main">Add a new retailer</h1>
                    </div>
                </header>
                <div className={"sps-card"}>
                    <div className="sps-card__body">
                        <form>
                            <fieldset className="sps-form-group">
                                <div className={(!this.state.validName ? "sps-form-group--error sps-form-group sps-form-group--required" : "sps-form-group sps-form-group--required")}>
                                    <label className="sps-form-group__label" htmlFor="text_input_example_4">Company Name</label>
                                    <input type="text" value={this.newRetailerName} ref={input => this.newRetailer = input} onChange={this.checkRetailerName} className="sps-form-control" id="text_input_example_4" placeholder="Enter a company name"/>
                                    <small className="sps-form-group__feedback--error" hidden={this.state.validName}>
                                        Please provide a name that is not already used in this consolidation set.
                                    </small>
                                </div>
                                <label>
                                    Hub ID:
                                    <input type="text" value={this.state.hubid} ref={input => this.hubid = input} className="sps-form-control" placeholder="3 alphanumeric code"/>
                                </label>
                            </fieldset>
                        </form>
                        <SpsButton preset="default" message="Cancel" onClick={this.returnToMainPage} style={{marginRight: .625 + 'rem'}}/>
                        <SpsButton preset="confirm" message="Save" onClick={this.saveRetailer} disabled={this.state.validName === false || this.state.newRetailerName === ''}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(newRetailerPage);