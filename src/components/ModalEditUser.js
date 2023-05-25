import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { postCreateUser } from '../services/UserService';
import { putUpdateUser } from '../services/UserService';
import { Toast } from 'bootstrap';


const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit } = props;  
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [email, setEmail] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job , email)
        if(res && res.updateAt) {
            
        }
    }

    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.last_name)
            setEmail(dataUserEdit.email)
        }
    }, [dataUserEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div class="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <label className="form-label">Job</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser