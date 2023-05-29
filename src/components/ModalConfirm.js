import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;  
     
    const confirmDelete = async() => {
        let res = await deleteUser(dataUserDelete.id) 
        if(res && +res.statusCode === 204) {
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
        }
    }

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Are you sure ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm