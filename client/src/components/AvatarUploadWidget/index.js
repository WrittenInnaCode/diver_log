import { useEffect, useRef, } from "react";
import Button from 'react-bootstrap/Button';

const UploadWidget = ({ avatar, setAvatar }) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

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
                // Update the avatar URL in the parent component's state
                setAvatar(newAvatarURL);
            }
        })
    })

    return (
        <Button onClick={() => widgetRef.current.open()}
            value={avatar}
        >Change Profile Picture
        </Button>
    )
}

export default UploadWidget;