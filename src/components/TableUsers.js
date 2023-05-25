import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate'
import ModalAddNew from './ModalAddNew'
import ModalEditUser from './ModalEditUser'


const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({ })

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
    }

    useEffect(() => {
        getUsers(1)
    }, [])


    const getUsers = async (page) => {
        let res = await fetAllUser(page)

        if(res && res.data) {
            setTotalUsers(res.total)
            console.log(res);
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+ event.selected + 1)
        // do không biết kiểu dữ liệu của selected nên để dấu + trước để convert từ string sang number
    }

    return (
        <>
            <div className='my-3 add-new'>
                <span><b>List users</b></span>
                <button 
                    className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new user
                </button>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && 
                        
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button 
                                            className='btn btn-primary mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className='btn btn-danger'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
            <ReactPaginate 
                breakLabel= "..."
                nextLabel="next >"
                onPageChange= {handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew 
                show = {isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser 
                show={isShowModalEdit}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
                dataUserEdit={dataUserEdit}
            />
        </>
    )
}

export default TableUsers