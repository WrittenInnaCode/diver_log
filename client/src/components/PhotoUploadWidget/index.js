import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';

const PhotoUploadWidget = ({ onPhotoUpload }) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dbudwdvhb",
            uploadPreset: "DivePhotoPreset",
            folder: "dive-photos"
        }, function (error, result) {
            // console.log(result)
            if (!error && result && result.event === "success") {
                // onPhotoUpload(result.info.secure_url);
                
                // Store the selected photo URL without updating the state
                setSelectedPhotos((prevSelected) => [...prevSelected, result.info.secure_url]);
            }
        });
    }, []);

    useEffect(() => {
        // Update the state with all selected photos once all uploads are finished
        if (selectedPhotos.length > 0) {
            onPhotoUpload(selectedPhotos);
            setSelectedPhotos([]); // Clear the selected photos
        }
    }, [selectedPhotos, onPhotoUpload]);


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