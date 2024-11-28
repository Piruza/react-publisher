import { api_url } from "@/constants/data";
import Axios from "axios";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function CreateTourModal ({ showTourLocationModal, close, save }) {
    const { i18n, t } = useTranslation();
    const imageInput = useRef(null)
    const galleryInput = useRef(null)
    const [formData, setFormData] = useState({})

    const handleFile = files => {
        const file = files[0]

        const fd = {...formData}
        fd.image = {
            src: URL.createObjectURL(file),
            file
        }

        setFormData({...fd})
    }

    const removeImage = () => {
        const fd = {...formData}
        fd.image = null
        setFormData({...fd})
    }

    const inputHandler = e => {
        const fd = {...formData}

        fd[e.target.id] = e.target.value
        setFormData({...fd})
    }

    const handleFiles = files => {
        const fd = {...formData}
        const gallery = []
        Object.keys(files).map(x => {
            gallery.push({
                src: URL.createObjectURL(files[x]),
                file: files[x]
            })
        })

        fd.gallery = [...gallery]
        setFormData({...fd})
    }

    const saveAsDraft = () => {
        const fd = {...formData}
        fd.status = 0
        setFormData({})

        save(fd)
    }

    const saveAsApproval = () => {
        const fd = {...formData}
        fd.status = 3
        setFormData({})

        save(fd)
    }
    
    const saveAsPublish = () => {
        const fd = {...formData}
        fd.status = 2
        setFormData({})

        save(fd)
    }

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
                    <div className="ctf_image">
                        { formData.image && formData.image.src ? (
                            <img src={formData.image.src} alt="" />
                        ) : (
                            <img src="/images/image_placeholder.png" alt="" />
                        ) }
                        <div className="upload_image">
                            <p>Set an main image</p>
                            <div className="upload_image_btns">
                                <button className="upload_file_btn" onClick={() => imageInput.current.click()}>
                                    <img src="/images/upload.svg" alt="" />
                                    Upload image
                                </button>
                                <button className="remove_image_btn" onClick={removeImage}>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            ref={imageInput } hidden
                            onChange={e => handleFile(e.target.files)}
                        />
                    </div>
                    <div className="ctf_label_input ctf_name">
                        <p>Tour name</p>
                        <img src="/images/help.png" alt="" />
                        <input type="text" id="title" placeholder="Enter tour name" onChange={inputHandler} />
                    </div>
                    <div className="ctf_label_input ctf_name">
                        <p>Tour description</p>
                        <img src="/images/help.png" alt="" />
                        <textarea name="" id="description" placeholder="Enter tour description" onChange={inputHandler}></textarea>
                    </div>
                    <div className="ctf_label_input ctf_name">
                        <p>Price (Optional)</p>
                        <img src="/images/help.png" alt="" />
                        <input type="number" step={0.01} id="price" onChange={inputHandler} placeholder="Enter tour name" />
                    </div>
                    <div className="ctf_group">
                        <div className="ctf_label_input ctf_name">
                            <p>Aviability</p>
                            <img src="/images/help.png" alt="" />
                            <select id="aviability" onChange={inputHandler}>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                                <option value="Demo">Demo</option>
                            </select>
                        </div>
                        <div className="ctf_label_input ctf_name">
                            <p>Type of tour</p>
                            <img src="/images/help.png" alt="" />
                            <select id="toup_type" onChange={inputHandler}>
                                <option value="Outsiede">Outsiede</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Playground">Playground</option>
                            </select>
                        </div>
                    </div>
                    <div className="ctf_gallery">
                        <div className="gallery_images_container" onClick={() => galleryInput.current.click()}>
                            <div className="gallery_upload_icon">
                                <img src="/images/upload.svg" alt="" />
                            </div>
                            <p>
                                Drag & Drop your Images for gallery or <span style={{ color: "#29BEC4" }}>choose files</span>
                            </p>
                            <p>500 MB max file size</p>
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            multiple
                            ref={galleryInput } hidden
                            onChange={e => handleFiles(e.target.files)}
                        />

                        <div className="ctf_gallery_images">
                            { formData.gallery && formData.gallery.length > 0 && formData.gallery.map (x =>  (
                                <img src={x.src} alt="" />
                            ))}
                        </div>

                    </div>
                    <div className="ctf_locations">
                        <div className="ctf_add_location" onClick={showTourLocationModal}>
                            <p>Add location</p>
                        </div>
                    </div>
                    <div className="ctf_actions">
                        <div className="ctf_save_draft" onClick={saveAsDraft}>
                            <p>Save as draft</p>
                        </div>
                        <div className="ctf_save_approval"  onClick={saveAsApproval}>
                            <p>Save as approval</p>
                        </div>
                        <div className="ctf_publish"  onClick={saveAsPublish}>
                            <p>Publish</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}
