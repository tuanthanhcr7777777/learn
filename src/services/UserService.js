// import axios from "axios"
import axios from './customize-axios'


const fetAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users', {name, job})
}

const putUpdateUser = (name, job, email) => {
    return axios.put('/api/users', {name, job, email})

}

export { fetAllUser, postCreateUser, putUpdateUser }

