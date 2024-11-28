import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ toggleHandler }) {
    const navigate = useNavigate();

    const {t} = useTranslation()

    const pageNavigate = (pageName) => {
            navigate(pageName);
    };

	const [activeMenu, setActiveMenu] = useState('Dashboard');
	const [toggle, setToggle] = useState(false);


	return (
		<section id="sidebar" className={`${ toggle ? 'sidebar_toggle' : '' }`}>
            <div className="sibebar_top">
                <div className="logo">
                    <Link to={'/dashboard '} onClick={() => setActiveMenu('dashboard')}  className={`${activeMenu == 'dashboard' ? 'active' : ''}`}>
                        <img src="/images/logo.svg" alt="" />
                    </Link>
                </div>
                <div className="sidebar_collapse" onClick={() => {
                    setToggle(!toggle)
                    toggleHandler(toggle)
                }}>
                    <img src="/images/arrow-right-circle.svg" alt="" />
                </div>
            </div>
            <div className="sidebar_menu">
                <div className="sidebar_menu_item">
                    <Link>
                        <img src="/images/chart-pie 01.svg" alt="" />
                        <p>Assets</p>
                    </Link>
                </div>
                <div className="sidebar_menu_item">
                    <Link  onClick={() => setActiveMenu('tours')} className={`${activeMenu == 'tours' ? 'active' : ''}`} to={'/tours'}>
                        <img src="/images/location-w.svg" alt="" />
                        <p>Tours</p>
                    </Link>
                </div>
                <div className="sidebar_menu_item">
                    <Link>
                        <img src="/images/chart-wave-rectangle.svg" alt="" />
                        <p>Statistics</p>
                    </Link>
                </div>
                <div className="sidebar_menu_item">
                    <Link>
                        <img src="/images/target.svg" alt="" />
                        <p>Ads</p>
                    </Link>
                </div>
                <div className="sidebar_menu_item">
                    <Link to={'/generate-model'} onClick={() => setActiveMenu('Generate')} className={`${activeMenu == 'Generate' ? 'active' : ''}`}>
                        <img src="/images/target.svg" alt="" />
                        <p>Generate Model</p>
                    </Link>
                </div>
            </div>
		</section>
	);
}