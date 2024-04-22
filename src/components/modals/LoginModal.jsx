import React, { useState } from "react";

import { toast } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";
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

function LoginModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (!email || !password) {
      return toast.error("모든 항목을 입력해주세요.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return toast.success("로그인이 완료되었습니다.");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={props.isLogin} onOpenChange={props.changeLogin}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <h2 className="text-2xl font-bold text-primary">Login</h2>
              </ModalHeader>
              <ModalBody>
                <Input type="email" label="Email" onChange={handleEmail} />
                <Input
                  type="password"
                  label="Password"
                  onChange={handlePassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
