import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService';


const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;  
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    // const [email, setEmail] = useState('')

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)

        if (res && res.id) {
            handleClose()
            setName('')
            setJob('')
            // setEmail('')
            handleUpdateTable({ first_name : name, id:res.id, last_name: job })
        } else {
            // handleClose()
        }
    }

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                        {/* <div class="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew