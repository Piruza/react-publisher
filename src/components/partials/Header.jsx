import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { api_url } from "@/constants/data";

export default function Header({ activePage = null }) {
  const navigate = useNavigate();
  const userState = useSelector(state => state.auth);
  const { i18n, t } = useTranslation();

	const pageNavigate = (pageName) => {
			navigate(pageName);
	};
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [addClass, setAddClass] = useState(false);
	const [show, setShow] = useState(false);
	
	const onChangeLang = (lang) => {
		const lang_code = lang;
		i18n.changeLanguage(lang_code);
	};

  // Add a class to the element when scrolled 50px
	const handleScroll = () => {
		if (window.scrollY >= 50) {
			setAddClass(true);
		} else {
			setAddClass(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const dispatch = useDispatch();

	// useEffect(() => {
  
	//   const auth_token = localStorage.getItem('auth_token')
  
	//   Axios.post(`${api_url}/me`, {}, {headers: {
	// 	'Authorization': `Bearer ${auth_token}` 
	//   }}).then(res => {
	// 	if(res.data.api_token) {
	// 	  dispatch({
	// 		type: 'PROFILE',
	// 		payload: res.data
	// 	  });
  
	// 	}
	//   }).catch(err => {
	// 	localStorage.removeItem('auth_token');
	//   })
  
	// }, [dispatch]);


	const handleClick = () => {
		if(userState.isAuthenticated){
			setShow(true)
		}else{
			setShow(false)
			navigate('/login')
		}
	}



	return (
		<></>
	);
}


	{/* <Link to="/help-center" className="text-white ml-20">
როგორ მუშაობს
</Link> */}