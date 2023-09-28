import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const UploadWidget = ({ avatar, setAvatar }) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [previewImage, setPreviewImage] = useState(avatar);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dbudwdvhb",
            uploadPreset: "biopreset",
            cropping: true,
            showSkipCropButton: false,
            croppingAspectRatio: 1,
            folder: "avatar"
        }, function (error, result) {
            // console.log(result)
            if (!error && result && result.event === "success") {
                const newAvatarURL = result.info.secure_url;
                setAvatar(newAvatarURL); // Update the avatar URL in the parent component's state
                setPreviewImage(newAvatarURL); // Update the preview image
            }
        });

        // Update previewImage with the current avatar when the component mounts
        setPreviewImage(avatar);
    }, [setAvatar, avatar]); // Include avatar as a dependency


    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="px-2">
                <Image roundedCircle
                    src={previewImage}
                    alt="Avatar Preview"
                    style={{ maxWidth: "120px", maxHeight: "120px", objectFit: "cover" }}
                />
            </div>
            <div className="px-2">
                <Button variant="primary" size="sm"
                    onClick={() => widgetRef.current.open()}
                    value={avatar}>
                    Change Profile Picture
                </Button>
            </div>
        </div>
    )
}

export default UploadWidget;