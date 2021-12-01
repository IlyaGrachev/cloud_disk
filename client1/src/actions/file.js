import axios from 'axios'
import { addFile, setFiles } from "../redusers/fileReducer";

export function getFiles(dirId) {
	return async dispatch => {
		try {
			const respons = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`,{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(setFiles(respons.data))
		} catch(e){
			alert(e.response.data.message)
		}
	}
}

export function createDir(dirId, name) {
	return async dispatch => {
		try {
			const respons = await axios.post(`http://localhost:5000/api/files`,
			{
				name,
				parent: dirId,
				type: 'dir'
			}, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(addFile(respons.data))
		} catch(e){
			alert(e.response.data.message)
		}
	}
}