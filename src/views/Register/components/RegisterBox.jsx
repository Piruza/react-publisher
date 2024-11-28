import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Axios from "axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "@/constants/data";

export default function RegisterBox({  }) {
    const navigate = useNavigate();

    const pageNavigate = (pageName) => {
        navigate(pageName);
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const sp = searchParams.get("from")
    const { t } = useTranslation();

    const [checkTerm, setCheckTerm] = useState(false)
    const [checkConf, setCheckConf] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState([])
    const [date, setDate] = useState([])
    const [data, setData] = useState({
        fullname: null,
        dob: null,
        phone: null,
        password: null
    })

    const changeHandler = e => {
        const fd = {...data}

        fd[e.target.id] = e.target.value

        setErrors([])
        setData({...fd})
    }

    const dateChangeHandler = (val, i) => {
        const d = [...date]

        d[i] = val

        setData({...data}, {dob: d.join('-')})
        setErrors([])
        setDate([...d])
    }

    const submitHandler = () => {
        const err = []

        if(date.length != 3){
            err.push('არასწორი დაბადების თარიღი')
        }else if(getAge(date.join('-')) < 18){
            err.push('თქვენი ასაკი უნდა იყოს 18 წელზე მეტი')
        }
        

        if(!data.fullname || data.fullname.length < 2){
            err.push('არასწორი სახელი,გვარი')
        }

        if(!data.phone || data.phone.length != 9){
            err.push('არასწორი ტელეფონი, ტელეფონი უნდა შედგებოდეს 9 ციფრისგან')
        }

        if(!data.password || data.password.length < 6){
            err.push('პაროლის მინ. სიგრძე უნდა იყოს 6 სიმბოლო')
        }

        if(!checkTerm){
            err.push('აუცილებელია ეთანხმებოდეთ საიტის წესებსა და პირობებს')
        }

        console.log(checkConf, checkTerm)

        if(!checkConf){
            err.push('აუცილებელია ეთანხმებოდეთ საიტის კონფიდენციალურობის პირობებს')

        }

        setErrors([...err])

        if(err.length == 0){

            const formData = {...data}
            formData.dob = date.join('-')

            Axios.post(`${api_url}/register`, {formData}).then(res => {
                if(res.data?.api_token){
                    localStorage.setItem('auth_token',res.data.api_token);
            
                    window.location.href = '/profile'
                }else{
                    setErrors(['დაფიქსირდა შეცდომა, სცადე თავიდან'])
                }
            }).catch(err => {
                setErrors([err.response.data.error])
            })
        }

    }

    const changeCheckbox = (event) => {
        if(event.target.id == 'terms'){
            setCheckTerm(event.target.checked)
        }else{
            setCheckConf(event.target.checked)
        }
    }

    const getAge = (DOB) => {
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }    
        return age;
    }

	return (
		<div className="register_box_wrapper">
            <div className="register_box_title">
                { sp ? (
                    <h1>{t("complete_the_quick_registration")}</h1>
                ) : (
                    <h1>{t("sign_up")}</h1>
                ) }

                <p>{t("enter_your_date_of_birth")}</p>
            </div>
            <div className="register_box_form">
                <div className="form_error">
                    {errors && errors.map(err => (
                        <p>{err}</p>
                    ))}
                </div>
                <div className="form_inline">
                    <div className="form_group  f-25">
                        <input type="number" className="form_input" onChange={(e) => dateChangeHandler(e.target.value, 2)} placeholder={t('dd')} />
                    </div>
                    <div className="form_group f-25">
                        <input type="number" className="form_input" onChange={(e) => dateChangeHandler(e.target.value, 1)} placeholder={t('mm')} />
                    </div>
                    <div className="form_group  f-25">
                        <input type="number" className="form_input" onChange={(e) => dateChangeHandler(e.target.value, 0)} placeholder={t('yyyy')} />
                    </div>
                </div>
                <div className="form_group">
                    <input type="text" className="form_input" id="fullname" onChange={changeHandler} placeholder={t('fullname')}/>
                </div>
                <div className="form_group">
                    <input type="text" className="form_input" id="phone" onChange={changeHandler}  placeholder="+995"/>
                </div>
                <div className="form_group">
                    <input type={!showPass ? "password" : "text"} className="form_input" id="password" onChange={changeHandler}  placeholder={t('create_password')} />
                    <img className="form_icon" src={ showPass ? "/images/icons/eye.svg" : "/images/icons/eye-slash.svg"} alt="" onClick={() => setShowPass(!showPass)}/>
                </div>

                <div className="form_group">
                    <div className="reg_agreement">
                        <input type="checkbox" onChange={changeCheckbox} id="terms" />
                        <a href="/files/terms-n-conditions.pdf" target="_blank">ვეთანხმები საიტის წესებსა და პირობებს</a>
                    </div>
                    <div className="reg_agreement">
                        <input type="checkbox" onChange={changeCheckbox} id="conf" />
                        <a href="/files/terms-n-conditions.pdf" target="_blank">ვეთანხმები საიტის კონფიდენციალურობის პირობებს</a>
                    </div>
                </div>

                <div className="form_submit_btn">
                    { sp ? (
                        <button onClick={submitHandler} id="submit_form">{t("registration")}</button>
                    ) : (
                        <button onClick={submitHandler} id="submit_form">{t("create_account")}</button>
                    ) }
                </div>
            </div>
            <div className="register_box_divider">
                <div className="box_divider"></div>
                <div className="divider_text">
                </div>
            </div>

            <div className="register_box_footer">
                <p>{t("legal_drinking_age")} <a href="#">{t("privacy_policy")}</a></p>
            </div>
        </div>
	);
}

