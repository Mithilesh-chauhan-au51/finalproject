//import button component
import Button from 'react-bootstrap/Button';
//import importtant hook from react,reactrouterdom
import {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

//creating a image upload component 
const ImageUploadButton = (props) => {
  
  const fileInput = useRef(null);
const [imageSrc, setImageSrc] = useState(null);
//console.log("imgsrc",imageSrc)
   const handleSelectImageClick = () => {
    fileInput.current.click();
  };
  const handleFileInputChange = () => {
    const file = fileInput.current.files[0];
   // console.log(file)
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
       props.onImageUpload(reader.result)
    });
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="uploadcontainer">
      <input type="file" id="file" accept="image/*" hidden ref={fileInput} onChange={handleFileInputChange} />
      <div className="img-area">
        <FontAwesomeIcon className="icon" icon={faUpload} /> Upload
        <h5>Upload best image</h5>
        <p>accept formats(jpg, jpeg, png, gif, svg, ico, jfif, webp)</p>
        <img src={imageSrc} alt="" />
      </div>
      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={handleSelectImageClick}>
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadButton;
