import React, {Component} from 'react';

export default class DesignIcon extends Component {
    state = {
        openModal: false,
        icon: "warning",
        title: "No designs matched, click retailer to resolve"
    };

    determineIcon = () => {
        if (this.props.thisDocument.selectedDesign !== '') {
            this.setState({
                icon: "ok",
                title: this.props.thisDocument.designs[0].split("/")[this.props.thisDocument.designs[0].split("/").length - 1]
            });
        } else if (this.props.thisDocument.selectedDesign === '') {
            if (this.props.thisDocument.designs.length > 1) {
                this.setState({
                    icon: "warning",
                    title: "more than one design, click retailer to resolve"
                });
            } else {
                this.setState({
                    icon: "cancelled",
                    title: "No designs matched, click retailer to resolve"
                });
            }
        }
        console.log("determine icon: " + this.state);
    };

    componentDidMount() {
        console.log('DidMount');
        this.determineIcon()
    }

    render() {
        return (
            <React.Fragment>
                <i className={"sps-icon sps-icon-status-" + this.state.icon} aria-hidden="true" title={this.state.title}/>
            </React.Fragment>
        )
    }
}