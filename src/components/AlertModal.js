import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './AlertModal.css';

class AlertModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    closeModal() {
        this.setState({ open: false });
    }

    openModal() {
        this.setState({ open: true });
    }

    render() {
        const { message } = this.props;
        return (
             this.state.open ? 
                <div className="AlertModal">
                    <div className="AlertModal-content">
                        <header className="AlertModal-header">
                            <button 
                                type="button" onClick={() => this.closeModal()}>
                                    <FontAwesomeIcon icon={ faTimes } />
                            </button>
                        </header>
                        <main>
                            <FontAwesomeIcon className="AlertModal-ErrorIcon" icon={ faTimesCircle } />
                            {message}
                        </main>
                        <footer className="AlertModal-footer">
                            <button onClick={() => this.closeModal()}>Ok</button>
                        </footer>
                    </div>
                </div> : 
                '' 
        )
    }
}

export default AlertModal;