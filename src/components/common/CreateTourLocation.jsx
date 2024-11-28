import { api_url } from "@/constants/data";
import Axios from "axios";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toggle from 'react-toggle'

export default function CreateTourLocation ({ show, close, title }) {
    const { i18n, t } = useTranslation();



    return (
        <div className="create_tour_modal">
            <div className="create_tour_form">
                <div className="create_tour_form_header">
                    <p>Create Tour</p>
                    <span>Create your desired tour based on the following information</span>
                    <div className="close" onClick={close}>
                        <img src="/images/remove.png" alt="" />
                    </div>
                </div>
                <div className="create_tour_form_body">
                    <div className="ctf_label_input ctf_name">
                        <p>Location name</p>
                        <img src="/images/help.png" alt="" />
                        <input type="text" placeholder="Enter location name" />
                    </div>
                    
                    <div className="ctf_label_input">
                        <p>Options</p>
                        <img src="/images/help.png" alt="" />

                        <div className="toggle_options">
                            <div className="toggle_option">
                                <p>Generate QR</p>
                                <Toggle
                                    defaultChecked={false}
                                    icons={false}
                                    onChange={null} />
                            </div>
                            <div className="toggle_option">
                                <p>Green screen</p>
                                <Toggle
                                    defaultChecked={false}
                                    icons={false}
                                    onChange={null} />
                            </div>
                            <div className="toggle_option">
                                <p>ChatTGPT mode</p>
                                <Toggle
                                    defaultChecked={false}
                                    icons={false}
                                    onChange={null} />
                            </div>
                        </div>

                    </div>
                    <div className="ctf_group">
                        <div className="ctf_label_input ctf_name">
                            <p>LAT</p>
                            <img src="/images/help.png" alt="" />
                            <input type="text" placeholder="Enter LAT" />

                        </div>
                        <div className="ctf_label_input ctf_name">
                            <p>LNG</p>
                            <img src="/images/help.png" alt="" />
                            <input type="text" placeholder="Enter LNG" />
                        </div>
                    </div>
                    <div className="ctf_map_buttons">
                        <div className="ctf_map_reset">
                            <p>Reset</p>
                        </div>
                        <div className="ctf_map">
                            <p>Map</p>
                        </div>
                    </div>
                    <div className="ctf_group">
                        <div className="ctf_label_input ctf_name">
                            <p>IOS</p>
                            <img src="/images/help.png" alt="" />
                            <select>
                                <option value="1">Select assets</option>
                                <option value="1">Test 1</option>
                                <option value="1">Test 2</option>
                            </select>
                        </div>
                        <div className="ctf_label_input ctf_name">
                            <p>Android</p>
                            <img src="/images/help.png" alt="" />
                            <select>
                                <option value="1">Select assets</option>
                                <option value="1">Test 1</option>
                                <option value="1">Test 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="ctf_label_input ctf_name">
                        <p>Link AD</p>
                        <img src="/images/help.png" alt="" />
                        <select>
                            <option value="1">Select assets</option>
                            <option value="1">Test 1</option>
                            <option value="1">Test 2</option>
                        </select>
                    </div>
                    
                    <div className="ctf_actions">
                        <div className="ctf_back">
                            <p>Back</p>
                        </div>
                        <div className="ctf_publish" onClick={close}>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}
