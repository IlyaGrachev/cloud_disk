import React from "react";
import './file.css';
import { useDispatch, useSelector } from 'react-redux'
import DirLogo from '../../../../assets/img/dir.svg';
import FileLogo from '../../../../assets/img/file.svg';
import { pushToStack, setCurrentDir } from "../../../../redusers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const fileView = useSelector(state => state.files.view)

	function openDirHandler(file) {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	function downloadClickHandler(event) {
		event.stopPropagation()
		downloadFile(file)
	}

	function deleteClickHandler(event) {
		event.stopPropagation()
		dispatch(deleteFile(file))
	}


	if (fileView === 'list') {
		return (
			<div className='file' onClick={() => openDirHandler(file)}>
				<img src={file.type === "dir" ? DirLogo : FileLogo} alt="" className="file__img" />
				<div className="file__name">{file.name}</div>
				<div className="file__date">{file.date.slice(0, 10)}</div>
				<div className="file__size">{sizeFormat(file.size)}</div>
				{file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)}
					className='file__btn file__download'>
					Скачать
				</button>}
				<button className='file__btn file__delete' onClick={(event) => deleteClickHandler(event)}>Удалить</button>
			</div>
		)
	}

	if (fileView === 'plate') {
		return (
			<div className='file-plate' onClick={() => openDirHandler(file)}>
				<img src={file.type === "dir" ? DirLogo : FileLogo} alt="" className="file-plate__img" />
				<div className="file-plate__name">{file.name}</div>

				<div className="file-plate__btns">
					{file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)}
						className='file-plate__btn file-plate__download'>
						Скачать
					</button>}
					<button className='file-plate__btn file-plate__delete'
						onClick={(event) => deleteClickHandler(event)}>
						Удалить
					</button>
				</div>


			</div>
		)
	}


}

export default File;