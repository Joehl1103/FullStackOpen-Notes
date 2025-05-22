/**This is a service module to allow reuse of the main HTTP methods for the notes api endpoint */

import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    // hardcoded non-existing note to demonstrate error handling
    // const nonExisting = {
    //     id: 1000,
    //     content: 'This note is not saved to server',
    //     important: true
    // }
    // return request.then(response => response.data.concat(nonExisting))
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data) 
}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data)
 }

export default {getAll,create,update}