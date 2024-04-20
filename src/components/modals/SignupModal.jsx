import React, { useMemo, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../../firebase/firebase";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { createUserWithEmailAndPassword } from "firebase/auth";

// Todo : 다른 파일로 로직 분리하기
//        왜 import로 가져오면 apikey가 안 나오는지 (가져오고 console.log 찍으면 나오는데 onSubmit에선 apikey를 못불러옴.)

function SignupModal(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const validateEmail = (email) => email.match(emailRegex);
  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password) => password.match(passwordRegex);
  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const validateConfirmPassword = (confirmPassword) =>
    confirmPassword === password;
  const isInvalidConfirmPassword = useMemo(() => {
    if (confirmPassword === "") return false;
    return validateConfirmPassword(confirmPassword) ? false : true;
  }, [confirmPassword]);

  const onSubmit = async () => {
    if (!emailRegex.test(email)) {
      return toast.error("유효한 이메일을 입력해주세요.");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("비밀번호 8자 이상, 특수문자를 포함해주세요.");
    }

    if (password !== confirmPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return toast.success("회원가입이 완료되었습니다.");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={props.isSign} onOpenChange={props.changeSign}>
      <ToastContainer
        position="bottom-right"
        theme={localStorage.getItem("Theme")}
      />
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1">
              <h2 className="text-2xl font-bold text-primary">Sign Up</h2>
            </ModalHeader>
            <ModalBody>
              <Input
                type="email"
                label="Email"
                onChange={handleEmail}
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? "danger" : "default"}
                errorMessage={isInvalidEmail && "유요한 이메일을 입력해주세요."}
              />
              <Input
                type="password"
                label="Password"
                onChange={handlePassword}
                isInvalid={isInvalidPassword}
                color={isInvalidPassword ? "danger" : "default"}
                errorMessage={
                  isInvalidPassword && "8자 이상, 특수문자를 포함해주세요."
                }
              />
              <Input
                type="password"
                label="Confirm Password"
                onChange={handleConfirmPassword}
                isInvalid={isInvalidConfirmPassword}
                color={isInvalidConfirmPassword ? "danger" : "default"}
                errorMessage={
                  isInvalidConfirmPassword && "비밀번호가 일치하지 않습니다."
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={onSubmit}>
                Sign Up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SignupModal;
