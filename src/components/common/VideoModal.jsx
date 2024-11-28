import { api_url } from "@/constants/data";
import Axios from "axios";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toggle from 'react-toggle'

export default function VideoModal ({ close, src }) {
    const { i18n, t } = useTranslation();


    return (
        <div className="video_modal">
            <video controls >
                <source src={src}
                    type="video/mp4" />
            </video>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button className="video_modal_btn" onClick={() => open(src, '_blank')}>Download video</button>
                <button className="video_modal_btn" onClick={close}>Close video</button>
            </div>
        </div>  
    );
}
