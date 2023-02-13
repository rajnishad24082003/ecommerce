import React, { useRef, useState } from "react";
import { Modal, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import AvatarEditor from "react-avatar-editor";
import {
  uploadBytes,
  getDownloadURL,
  ref as ref_storage,
} from "firebase/storage";
import { storage, database } from "../misc/firebase";
import { useProfile } from "../context/profile.context";
import { set, ref as ref_database } from "firebase/database";

function AvatarUpload() {
  const [open, setOpen] = React.useState(false);
  const [foralert, setforalert] = React.useState(false);
  const handleClose = () => setOpen(false);
  const foralerthandleClose = () => setforalert(false);

  let fileuploadfunIcon = () => {
    document.getElementById("getFile").click();
  };
  let { profile } = useProfile();
  let acceptedfileformate = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg",
    "image/webp",
    "image/gif",
  ];
  let isvalidfile = (file) => {
    return acceptedfileformate.includes(file.type);
  };
  let [mainimage, setmainimage] = useState(null);
  let mainfilefun = (e) => {
    if (e.target.files.length === 1 && isvalidfile(e.target.files[0])) {
      setOpen(true);
      setmainimage(e.target.files[0]);
      return;
    } else {
      setforalert(true);
      return;
    }
  };
  let getBlod = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("file processing error"));
        }
      });
    });
  };
  let avatarediterref = useRef();
  let UploadandClose = async () => {
    const canvas = avatarediterref.current.getImageScaledToCanvas();
    try {
      const blob = await getBlod(canvas);
      const spaceRef = ref_storage(storage, `/profile/${profile.uid}/avatar`);
      await uploadBytes(spaceRef, blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });
      let downloadurl = await getDownloadURL(
        ref_storage(storage, `/profile/${profile.uid}/avatar`)
      );
      const uploadurl = ref_database(
        database,
        `/profile/${profile.uid}/avatar`
      );
      await set(uploadurl, downloadurl);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="avatarmaindiv">
      <i
        className="absolute bottom-1 right-6 text-lg bg-white bi bi-camera bg-light rounded-full px-2 py-1 border-2 border-slate-700"
        onClick={fileuploadfunIcon}
      ></i>
      <input
        type="file"
        id="getFile"
        className="fileuploadbtn hidden"
        /*for all images image/* */
        accept="image/png, image/gif,image/jpg, image/jpeg,image/webp,image/svg"
        onChange={mainfilefun}
      ></input>
      <>
        <Modal keyboard={false} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Avatar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <AvatarEditor
              image={mainimage}
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
              borderRadius={200}
              ref={avatarediterref}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={UploadandClose}>Upload</Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal keyboard={false} open={foralert} onClose={foralerthandleClose}>
          <Modal.Header>
            <Modal.Title>
              <div class="alert alert-danger" role="alert">
                <p>incorrect file type or multiple files selected</p>
              </div>
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    </div>
  );
}

export default AvatarUpload;
