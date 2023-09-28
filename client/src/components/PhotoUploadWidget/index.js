import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';

const PhotoUploadWidget = ({ onPhotoUpload }) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dbudwdvhb",
            uploadPreset: "DivePhotoPreset",
            folder: "dive-photos"
        }, function (error, result) {
            // console.log(result)
            if (!error && result && result.event === "success") {
                onPhotoUpload(result.info.secure_url);
            }
        });
    }, [onPhotoUpload]);


    return (
        <div className="d-flex justify-content-center align-items-center">

            <div className="px-2">
                <Button variant="primary" size="sm"
                    onClick={() => widgetRef.current.open()}>
                    Upload Dive Photos
                </Button>
            </div>
        </div>
    )
}

export default PhotoUploadWidget;