// import axios from "axios"
import axios from './customize-axios'


const fetAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users/2', {name, job})
}

const putUpdateUser = (name, job) => {
    return axios.put('/api/users/2', {name, job})

}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

export { fetAllUser, postCreateUser, putUpdateUser, deleteUser }

