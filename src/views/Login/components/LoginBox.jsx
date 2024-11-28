import { api_url } from "@/constants/data";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function LoginBox({  }) {
    const { i18n, t } = useTranslation();

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false)
    const[formData, setFormData] = useState({
        phone: null,
        password: null,
    })

    const[error, setError] = useState(null)
    
    const pageNavigate = (pageName) => {
        navigate(pageName);
    };


    const changeHandler = data => {

        const fd = {...formData}
        fd[data.target.id] = data.target.value
        setError(null)
    
        setFormData({...fd})
    }

    const formSubmit = (e) => {
        e.preventDefault()


    
        Axios.post(`${api_url}/login`, {formData}).then(res => {
          if(res.data?.api_token){
            localStorage.setItem('auth_token', res.data.api_token);
    
            window.location.href = '/profile'
    
          }else{
            setError('დაფიქსირდა შეცდომა, სცადე თავიდან')
          }
        }).catch(err => {
          setError(err.response.data.error)
        })
        
    
    }




	return (
		<div className="login_box_wrapper">
            <div className="register_box_title">
                <h1 className={`${i18n.language}_caps`}>{t("sign_in")}</h1>

            </div>
            <div className="register_box_form">
                <div className="form_error">
                    { error && (
                        <p>{t("invalid_credentials")}</p>
                    ) }
                </div>
                <div className="form_group">
                    <input type="text" className="form_input" id="phone" onChange={changeHandler} placeholder="+995"/>
                </div>
                <div className="form_group">
                    <input type={showPass ? "text" : "password"} className="form_input" id="password" onChange={changeHandler}  placeholder={t('create_password')} />
                    <img className="form_icon" src={ showPass ? "/images/icons/eye.svg" : "/images/icons/eye-slash.svg"} alt="" onClick={() => setShowPass(!showPass)}/>
                </div>

                <div className="forgot_password">
                    <Link to={'/forgot-password'}>
                        {t("forgot_password")}
                    </Link>
                </div>

                <div className="form_submit_btn">
                    <button id="submit_form" onClick={formSubmit}>{t("sign_in")}</button>
                </div>
            </div>
            <div className="register_box_divider">
                <div className="box_divider"></div>
                <div className="divider_text">
                    <p><Link to={'/register'}>{t("or_sign_up_with")}</Link></p>
                </div>
            </div>
            {/* <div className="register_box_soc_auth">
                <button className="soc_auth">
                    <img src="/images/icons/apple.svg" alt="" />
                </button>
                <button className="soc_auth">
                    <img src="/images/icons/google.svg" alt="" />
                </button>
                <button className="soc_auth">
                    <img src="/images/icons/fb.svg" alt="" />
                </button>
            </div> */}
            <div className="register_box_footer">
                <p>{t("legal_drinking_age")} <a href="#">{t("privacy_policy")}</a></p>

                <p style={{marginTop: '16px'}}>{t("already_have_account")} <Link to={'/register'} style={{ textDecoration: 'underline' }}>{t("sign_up")}</Link></p>
            </div>

            
        </div>
	);
}

