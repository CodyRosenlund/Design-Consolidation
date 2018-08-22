import React, {Component} from "react";

export default class Retailer extends Component {
    state = {
        name: '',
        documents: {},

    };

    addDocument = (newDocument) => {
        this.setState({
            documents: [...this.state.documents, newDocument]
        });
    }

    addDesign = (designURL, documentNumber) => {
        for (let i = 0; i < this.state.documents.length; i++) {
            if (this.state.documents[i].number === documentNumber) {
                this.state.documents[i].addDesign(designURL);
            }
        }
    }

}

export class Document extends Component {
    state = {
        number: '',
        design: '',
        map: '',
        matrix: '',
    };

    addDesign = (designURL) => {
        this.setState({
            design: designURL
        })
    }

}