import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CiImageOn } from "react-icons/ci";

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

function Profile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);
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

  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    unit: "px",
  });

  const [completedCrop, setCompletedCrop] = useState({
    aspect: 1 / 1,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "px",
  });

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme={localStorage.getItem("Theme")}
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
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
                    <ReactCrop
                      crop={crop}
                      onChange={(crop) => setCrop(crop)}
                      onComplete={(crop) => setCompletedCrop(crop)}
                      circularCrop
                      locked
                    >
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        style={{ transform: `scale(${scale})` }}
                      />
                    </ReactCrop>
                    <Slider
                      color="primary"
                      step={0.01}
                      maxValue={2}
                      minValue={0}
                      fillOffset={1}
                      defaultValue={1}
                      aria-label="Temperature"
                      className="max-w-md"
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
                          <CiImageOn className="text-5xl flex m-auto" />
                        </p>
                        <p className="text-[15px]">드래그 또는 클릭하여 이미지를 업로드하세요.</p>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
            <Image
              alt="profile"
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={80}
            />
            <Button onPress={onOpen} color="secondary">
              프로필 사진변경
            </Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex items-center gap-3">
              <Input type="email" label="Nickname" className="max-w-[240px]" />
              <Button>닉네임 변경</Button>
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
