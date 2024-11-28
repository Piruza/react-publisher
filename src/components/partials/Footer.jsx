import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useNavigate } from "react-router-dom";

export default function Footer({ }) {
    const navigate = useNavigate();

    const {t} = useTranslation()

    const pageNavigate = (pageName) => {
            navigate(pageName);
    };


	return (
        <></>
    );
}


	{/* <Link to="/help-center" className="text-white ml-20">
როგორ მუშაობს
</Link> */}