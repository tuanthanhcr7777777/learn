import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { putUpdateUser } from '../services/UserService';
// import { Toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;  
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    // const [email, setEmail] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if(res && res.updateAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
                // last_name: job,
                // email: email
            })

            handleClose()
        }
    }

    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
            // setJob(dataUserEdit.last_name)c
            // setEmail(dataUserEdit.email)
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser