import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import Cropper from "react-easy-crop";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CiImageOn } from "react-icons/ci";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firebaseStorage, auth } from "../firebase/firebase";

import { useRecoilState } from "recoil";
import { userProfileImgState, userNicknameState } from "../store";

import { db } from "../firebase/firebase";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Input,
  Code,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Slider,
} from "@nextui-org/react";
import { doc, updateDoc } from "firebase/firestore";

function Profile() {
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [scale, setScale] = useState(1);

  const [nickname, setNickname] = useState("");

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false },
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation,
    );

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);

    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
      return null;
    }

    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return canvas.toDataURL("image/png");
  }

  const uploadCroppedImage = async () => {

    if (!auth.currentUser) {
      return toast.error("인증되지 않은 사용자입니다.");
    }

    if (!selectedImage) {
      return toast.error("이미지를 선택해주세요.");
    }

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      const storageRef = ref(
        firebaseStorage,
        `profile_images/${auth.currentUser.uid}`,
      );
      await uploadString(storageRef, croppedImage, "data_url");

      getDownloadURL(storageRef)
        .then((url) => {
          updateDoc(doc(db, "userInfo", auth.currentUser.email), {
            profileImg: url,
          });
        })
        .catch((error) => {
          return toast.error("프로필 이미지를 등록해주세요.");
        });

      toast.success("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패 에러: ", error);
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleUpdateNickname = async () => {
    try {
      await updateDoc(doc(db, "userInfo", auth.currentUser.email), {
        nickname: nickname,
      });
      setUserNickname(nickname);
      toast.success("닉네임 업데이트 성공!");
    } catch (error) {
      toast.error("닉네임 업데이트에 실패했습니다.");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-primary">
                프로필 사진 변경하기
              </ModalHeader>
              <ModalBody>
                {selectedImage ? (
                  <>
                    <div>
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={scale}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setScale}
                      />
                    </div>
                    <Slider
                      color="primary"
                      step={0.01}
                      maxValue={3}
                      minValue={1}
                      defaultValue={1}
                      aria-label="Temperature"
                      onChange={(value) => setScale(value)}
                    />
                    <p>{scale}</p>
                  </>
                ) : (
                  <div
                    {...getRootProps()}
                    className="dropzone rounded-lg border border-dashed border-[#dddddd] py-10 text-center hover:cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? null : (
                      <div className="flex flex-col gap-3">
                        <p>
                          <CiImageOn className="m-auto flex text-5xl" />
                        </p>
                        <p className="text-[15px]">
                          드래그 또는 클릭하여 이미지를 업로드하세요.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={uploadCroppedImage}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="m-auto max-w-[986px]">
        <Card className="m-auto max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image alt="profile" radius="sm" src={userProfileImg} width={80} />
            <Button onPress={onOpen} color="secondary">
              프로필 사진변경
            </Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <Code color="primary">현재 닉네임 : {userNickname} </Code>
                <Input
                  type="text"
                  label="Nickname"
                  className="max-w-[240px]"
                  onChange={handleNickname}
                />
              </div>
              <Button
                className="reletive bottom-[-12px]"
                onClick={handleUpdateNickname}
              >
                닉네임 변경
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Code color="danger">
              *닉네임을 설정하지 않을 시 기능이 제한됩니다.
            </Code>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Profile;
