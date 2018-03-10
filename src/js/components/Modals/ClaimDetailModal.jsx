import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Modal from "./Modal.jsx";
import ClaimDetail from "src/components/Claim/Detail.jsx";

/**
 * Controlling our position on the graph!
 * Or at least handing up responsibility for controlling it back up to the graph, but handling the ui / interaction events
 */

@observer
export default class ClaimDetailModal extends React.Component {
    static propTypes = {
        modalCtrl: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.modalCtrl.claim) {
            return null;
        }

        return (
            <Modal
                show={this.props.modalCtrl.isOpen}
                title="Claim detail"
                onClose={() => {
                    this.props.modalCtrl.isOpen = false;
                }}
                classModifier="modal--scroller"
            >
                <ClaimDetail claimStore={this.props.modalCtrl.claim} />
            </Modal>
        );
    }
}
