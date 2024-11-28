import React, { Suspense, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import JSZip from "jszip";
import VideoModal from "@/components/common/VideoModal";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function GenerateModel() {
  return (
    <>
      <main>
        <DashboardLayout >
            <GenerateModelView />
        </DashboardLayout>
      </main>
    </>
  );
}

const Scene = ({src}) => {
    const fbx = useLoader(FBXLoader, src);
  
    return <primitive object={fbx} scale={0.01}  crossorigin="anonymous"/>;
};

const GenerateModelView = () => {
    const { i18n, t } = useTranslation();
    const inputRef = useRef()

    const[openContextMenu, setOpenContextMenu] = useState(false)
    const[uploadedFiles, setUploadedFiles] = useState([])
    const[selectedFile, setSelectedFile] = useState(null)
    const[progress, setProgress] = useState(0)
    const[uploadStatus, setUploadStatus] = useState('Upload')
    const fileTypes = ["mp4", "avi", "webm", "mov", "wmv"];

    const [time, setTime] = useState(0);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);

    const openContextMenuHandler = () => {
        setOpenContextMenu(!openContextMenu)
    }

    const handleFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0){
            setSelectedFile(e.target.files[0])
        }
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }

    const clearFileInput = () => {
        // inputRef.current.value = ""
        setSelectedFile(null)
        setProgress(0)
        setUploadStatus('Upload')
        setTime(0)
    }

    const handleChange = (file) => {
        setSelectedFile(file);

        handleUpload(file)
    };

    useEffect(() => {
        if(openVideoModal || showCanvas){
            setOpenContextMenu(false)
        }
    }, [openVideoModal, showCanvas])

    const handleUpload = async selectedFile => {

        if(uploadStatus == 'done') return 

        setTime(300)

        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);

        setUploadStatus('Uploading')

        try {
            const fd = new FormData()
            fd.append('video', selectedFile)

            await axios.post(
                // 'http://localhost:5173/generate',
                // 'http://localhost:8080/api/geoPlus/generate-video-model',
                'https://satesto.top/api/geoPlus/generate-video-model',
                fd,
                {
                    onUploadProgress: (prg) => {
                        const percentCompleted = Math.round(Math.round(prg.loaded * 100) / prg.total)
                        setProgress(percentCompleted)
                    }
                }
            ).then((res) => {
                console.log(res)
                setUploadedFiles(res.data)
                setUploadStatus('done')
            }).catch(() => {
                setUploadStatus('error')
            }).finally(() => {
                setTime(0)
            })

        } catch (error) {
            setUploadStatus('Upload')
            
        }
    }
    
    return (
        <>


            <div className="generate_wrapper">

                {!showCanvas && (
                    <div className="generate_container">

                        <div className="generate_wrapper_title">
                            <h1>Generate 3D model</h1>
                            <p>Upload your 3D model file to generate a web-ready version</p>
                        </div>

                        <div className="upload_wrapper">
                            {/* <input type="file" ref={inputRef} onChange={handleFileChange} accept="video/mp4,video/x-m4v,video/*" style={{display: 'none'}}  /> */}

                            
                            <div  className="file-btn">
                                <FileUploader handleChange={handleChange} name="file" types={fileTypes}  >
                                    <img src="/images/Upload_Container.png" alt="" />

                                    <p>Drag and drop video files to upload</p>
                                    <span>Supports GLB, GLTF, OBJ and FBX Files</span>

                                    <button>Select File</button>
                                </FileUploader>
                            </div>
                            

                            { selectedFile && (
                                <>
                                    { uploadStatus !== 'done' && (
                                        <div className="file-card">
                                            <div className="file-info">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                        <img src="/images/document.png" alt="" />
                                                        <h6>{ progress == 100 ? 'Processing' : 'Uploading' }</h6>
                                                    </div>
                                                    <button className="close-btn" onClick={clearFileInput}>
                                                        <img src="/images/close.png" alt="" />
                                                    </button>
                                                </div>
                                                <div className="progress-info">
                                                    <p>{progress}%, {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                                                    {`${time % 60}`.padStart(2, 0)} { time == 0 ? 'Finalizing last details...' : 'Remaining' }</p>
                                                </div>
                                                <div className="progress-bg">
                                                    <div className="progress" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    { uploadStatus == 'error' && (
                                        <div className="error-info">
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <img src="/images/error.png" alt="" />
                                                <h6>Error</h6>
                                            </div>
                                            <p className="res-error">Something went wrong, please try again!</p>
                                        </div>
                                    ) }

                                    { uploadStatus == 'done' && (
                                        <div className="response-info">
                                            <div className="response-item">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src="/images/document.png" alt="" />
                                                    <h6>Model.zip</h6>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <button className="close-btn" onClick={clearFileInput}>
                                                        <img src="/images/close.png" alt="" />
                                                    </button>

                                                    <button className="context-menu-btn" onClick={openContextMenuHandler}>
                                                        <img src="/images/dots.png" alt="" />
                                                    </button>
                                                </div>

                                                { openContextMenu && (
                                                    <div className={`tab_dropdown show`}>
                                                        <div className="tab_dropdown_item" onClick={() => uploadedFiles?.video  ? setOpenVideoModal(true) : null } style={{ textAlign: 'left' }}>
                                                            <p>Opend Video</p>
                                                        </div>
                                                        <div className="tab_dropdown_item"  onClick={() => uploadedFiles?.fbx  ? setShowCanvas(true) : null } style={{ textAlign: 'left' }}>
                                                            <p>Opend 3D in browser</p>
                                                        </div>
                                                        <div className="tab_dropdown_item" style={{ textAlign: 'left' }}>
                                                            <p>Download Maia File</p>
                                                        </div>
                                                    </div>
                                                ) }
                                            </div>
                                        </div>
                                    ) }
                                </>
                            ) }
                        </div>

                    </div>
                )}

                {showCanvas && (
                    <>
                        <Canvas style={{ height: '650px', marginBottom: '30px'}}>
                            <Suspense fallback={null}>
                                <Scene src={uploadedFiles.fbx} />
                                <OrbitControls />
                                <Environment preset="forest" background />
                            </Suspense>
                        </Canvas>
                        
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <button className="video_modal_btn" style={{backgroundColor: '#29BEC4'}} onClick={() => open(uploadedFiles.fbx, '_blank')}>Download Model</button>
                            <button className="video_modal_btn" style={{backgroundColor: '#29BEC4'}} onClick={() => setShowCanvas(false)}>Close Canvas</button>
                        </div>
                    </>
                )}
            </div>

            { openVideoModal && <VideoModal src={uploadedFiles.video} close={() => setOpenVideoModal(false)} /> }
            
        </>
    )
}