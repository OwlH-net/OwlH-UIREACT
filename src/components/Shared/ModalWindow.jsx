import React, { useState, useEffect } from 'react'
import {Modal, Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { ToggleModalWindow } from '../../store/webUtilities/actions'
import { DeleteNode } from '../../store/node/actions'


const ModalWindow = (props) => {

    const handleClose = () => props.toggleModal(false);

    return (
        <div>
            {
                props.modal 
                ? <Modal show={true} onHide={handleClose}>
                    <Modal.Header>{props.title}</Modal.Header>
                    <Modal.Body>{props.subtitle}</Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        {'btn' in props && props.id=='deleteNode' ? <Button variant={props.variantColor} onClick={() => {props.deleteNode(props.nodeSelected); props.toggleModal(false)}}>{props.btn}</Button> : null}
                    </Modal.Footer>
                </Modal>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        modal: state.webUtilities.modal,
        nodeSelected: state.webUtilities.nodeSelected
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteNode: (node) => dispatch(DeleteNode(node)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status))
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(ModalWindow)