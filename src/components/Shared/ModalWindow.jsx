import React, { useState, useEffect } from 'react'
import {Modal, Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { ToggleModalWindow, ModalButtonClicked, ToggleProgressBar } from '../../store/webUtilities/actions'

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
                        <Button variant='secondary' onClick={ ()=> {props.toggleModal(false)}} >Close</Button>
                        {'btn' in props && props.btn=='Delete' ? <Button variant={props.variantColor} onClick={() => { props.toggleProgressBar(true); props.toggleModal(false); props.modalButtonClicked({status:true, id:props.id}) }}>{props.btn}</Button> : null}
                        {/* {'btn' in props && props.id=='deleteNode' ? <Button variant={props.variantColor} onClick={() => { props.toggleProgressBar(true); props.toggleModal(false); props.modalButtonClicked({status:true, id:props.id}) }}>{props.btn}</Button> : null}
                        {'btn' in props && props.id=='deleteGroup' ? <Button variant={props.variantColor} onClick={() => { props.toggleProgressBar(true); props.toggleModal(false); props.modalButtonClicked({status:true, id:props.id}) }}>{props.btn}</Button> : null} */}
                    </Modal.Footer>
                </Modal>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        modal: state.webUtilities.modal
    }
}

const mapDispatchToProps = (dispatch) => ({
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status))
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(ModalWindow)