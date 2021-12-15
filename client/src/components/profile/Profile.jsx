import React from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import { API_URL } from "../../config";
import './profile.css';
import avatarLogo from '../../assets/img/ava.svg';


const Profile = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.user.currentUser)
	const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
	const history = useHistory()

	function changeHandler(e) {
		e.preventDefault()
		const file = e.target.files[0]
		dispatch(uploadAvatar(file))
	}



	return (
		<div className="profile">
			<div className="profile__btns">
				<button onClick={() => history.goBack()} className="profile__back"></button>
			</div>
			<div className="profile__username">{currentUser.email}</div>
			<img className="profile__avatar" src={avatar} alt='' />
			<button className="profile__delete" onClick={() => dispatch(deleteAvatar())}></button>
			<label className="profile__upload-label" htmlFor="profile__upload-input"></label>
			<input  id='profile__upload-input'className="profile__upload-input" accept="image/*" onChange={(e) => changeHandler(e)} type="file" placeholder="Загрузите аватар" />
		</div>
	)

}

export default Profile;