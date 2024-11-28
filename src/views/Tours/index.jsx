import React, { useState } from "react";

import Header from "@/components/partials/Header";
import { Link } from "react-router-dom";
import Footer from "@/components/partials/Footer";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/DashboardLayout";
import CreateTourModal from "@/components/common/CreateTourModal";
import CreateTourLocation from "@/components/common/CreateTourLocation";

const metadata = {
  title: "Home-5 || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};



export default function Tour() {
  return (
    <>
      <main>
        <DashboardLayout >
            <TourListPage />
        </DashboardLayout>
      </main>
    </>
  );
}

const TourListPage = () => {
    const { i18n, t } = useTranslation();

    const[showModal, setShowModal] = useState(false)
    const[showTourModal, setShowTourModal] = useState(false)
    const[showTourLocationModal, setShowTourLocationModal] = useState(false)
    const[tours, setTours] = useState([])

    const saveHandler = tour => {
        const t = [...tours]
        const tt = t.concat(tour)
        setTours([...tt])

        setShowTourModal(false)
    }

    const statuses = ['Draft', 'live', 'Review', 'Approval']
    
    return (
        <>
            <div className="tour_list_header">
                <div className="tour_list_title">
                    <p>Created tour list</p>
                </div>
                <div className="tour_list_actions">
                    <div className="tour_list_search">
                        <img src="/images/search 02.svg" alt="" />
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="tour_list_sort">
                        <div className="tour_list_sort_dropdown">
                            <p>Sort by: <span>Default</span></p>
                            <img src="/images/direction-down 01.svg" alt="" />
                        </div>
                    </div>
                    <div className="create_tour_button" onClick={() => setShowTourModal(true)}>
                        <p>Create Tour</p>
                    </div>
                </div>
            </div>
            <div className="tour_list_table" >
                <div className="tour_list_table_header">
                    <div className="tour_list_table_tr">
                        <p>#</p>
                    </div>
                    <div className="tour_list_table_tr">
                        <p>Image</p>
                    </div>
                    <div className="tour_list_table_tr">
                        <p>Tour name</p>
                    </div>
                    <div className="tour_list_table_tr">
                        <p>Status</p>
                    </div>
                    <div className="tour_list_table_tr">
                        <p></p>
                    </div>
                </div>
                <div className="tour_list_table_body">
                    { tours && tours.length > 0 && tours.map((tour, i) => (
                        <div className="tour_list_table_body_td">
                            <div className="tour_list_table_td">
                                <p>#{i+1}</p>
                            </div>
                            <div className="tour_list_table_td tour_image">
                                <img src={tour.image.src} alt="" />
                            </div>
                            <div className="tour_list_table_td">
                                <p>{tour.title}</p>
                            </div>
                            <div className="tour_list_table_td">
                                <div className={`tour_status_button ${statuses[tour.status].toLowerCase()}`}>
                                    <p>{statuses[tour.status]}</p>
                                </div>
                            </div>
                            <div className="tour_list_table_td">
                                <div className="tour_action_button">
                                    <div className="tab_icon" onClick={() => setShowModal(1)}>
                                        <img src="/images/more-horizontal.svg" alt="" />
                                    </div>
                                    <div className={`tab_dropdown ${showModal == 1 ? 'show' : ''}`}>
                                        <div className="tab_dropdown_item">
                                            <p>Delete</p>
                                        </div>
                                        <div className="tab_dropdown_item">
                                            <p>Make it active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }

                </div>
            </div>

            {showTourModal && (
                <CreateTourModal save={saveHandler} showTourLocationModal={() => setShowTourLocationModal(true)} close={() => setShowTourModal(false)} />
            )}

            
            {showTourLocationModal && (
                <CreateTourLocation close={() => setShowTourLocationModal(false)} />
            )}
            
        </>
    )
}