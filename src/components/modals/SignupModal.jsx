import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc } from "firebase/firestore";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { setDoc } from "firebase/firestore";

function SignupModal(props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/;

  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const validateEmail = (email) => email.match(emailRegex);
  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validateNickname = (nickname) => nickname.match(nicknameRegex);
  const isInvalidNickname = useMemo(() => {
    if (nickname === "") return false;
    return validateNickname(nickname) ? false : true;
  }, [nickname]);

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

    if (!nicknameRegex.test(nickname)) {
      return toast.error("닉네임은 한글, 영문, 숫자만 입력해주세요.");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("비밀번호 8자 이상, 특수문자를 포함해주세요.");
    }

    if (password !== confirmPassword) {
      return toast.error("비밀번호가 일치하지 않습니다.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "userInfo", email), {
        email: email,
        nickname: nickname,
        createdAt: new Date(),
      });
      return toast.success("회원가입이 완료되었습니다.");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={props.isSign} onOpenChange={props.changeSign}>
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
                  errorMessage={
                    isInvalidEmail && "유요한 이메일을 입력해주세요."
                  }
                />
                <Input
                  type="text"
                  label="Nickname"
                  onChange={handleNickname}
                  isInvalid={isInvalidNickname}
                  color={isInvalidNickname ? "danger" : "default"}
                  errorMessage={
                    isInvalidNickname && "한글, 영문, 숫자만 입력해주세요."
                  }
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
    </>
  );
}

export default SignupModal;
