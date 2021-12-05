import React from "react";
import './file.css';
import { useDispatch, useSelector } from 'react-redux'
import DirLogo from '../../../../assets/img/dir.svg';
import FileLogo from '../../../../assets/img/file.svg';
import { pushToStack, setCurrentDir } from "../../../../redusers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";

const File = ({ file }) => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)

	function openDirHandler(file) {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	function downloadClickHandler(event){
		event.stopPropagation()
		downloadFile(file)
	}

	function deleteClickHandler(event){
		event.stopPropagation()
		dispatch(deleteFile(file))
	}


	return (
		<div className='file' onClick={() => openDirHandler(file)}>
			<img src={file.type === "dir" ? DirLogo : FileLogo} alt="" className="file__img" />
			<div className="file__name">{file.name}</div>
			<div className="file__date">{file.date.slice(0, 10)}</div>
			<div className="file__size">{file.size}</div>
			{file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)}
				className='file__btn file__download'>
				Скачать
			</button>}
			<button className='file__btn file__delete' onClick={(event) => deleteClickHandler(event)}>Удалить</button>
		</div>
	)
}

export default File;