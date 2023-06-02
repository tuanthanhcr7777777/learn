import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate'
import ModalAddNew from './ModalAddNew'
import ModalEditUser from './ModalEditUser'
import _ from 'lodash'
import ModalConfirm from './ModalConfirm'
import './TableUser.scss'
// import { CSVLink, CSVDownload } from "react-csv";


const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [ isShowModalDelete, setIsShowModalDelete ] = useState(false)
    const [ dataUserDelete, setDataUserDelete ] = useState({})

    const [sortBy, setSortBy] = useState('asc')
    const [sortField, setSortField] = useState('id')

    const [keyWord, setKeyWord] = useState('')

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
        console.log(user);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers)
        console.log(listUsers);
        console.log(cloneListUsers);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);

        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField] , [sortBy])
        setListUsers(cloneListUsers)
    }


    useEffect(() => {
        getUsers(1)
    }, [])


    const getUsers = async (page) => {
        let res = await fetAllUser(page)

        if(res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+ event.selected + 1)
        // do không biết kiểu dữ liệu của selected nên để dấu + trước để convert từ string sang number
    }

    const handleSearch = (event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers)
        } else {
            getUsers(1)
        }
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

            <div className='col-4 my-3'>
                <input 
                    className='form-control'
                    placeholder='Search user by email...'
                    // value={keyWord}
                    onChange={(event) => handleSearch(event)}
                />
            </div>


            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <button
                                        onClick={() => handleSort('desc', 'id')}
                                    >
                                        Down
                                    </button>
                                    
                                    <button
                                        onClick={() => handleSort('asc', 'id')}
                                    >
                                        Up
                                    </button>
                                </span>
                                    
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <button
                                        onClick={() => handleSort('desc', 'first_name')}
                                    >
                                        Down
                                    </button>
                                    
                                    <button
                                        onClick={() => handleSort('asc', 'first_name')}
                                    >
                                        Up
                                    </button>
                                </span>
                            </div>
                        </th>
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
                                            onClick={() => handleDeleteUser(item)}
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
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm 
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}

export default TableUsers