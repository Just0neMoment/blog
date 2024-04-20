import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

// Todo : 로그인 기능 구현하기

function LoginModal(props) {
  return (
    <Modal isOpen={props.isLogin} onOpenChange={props.changeLogin}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1">
              <h2 className="text-2xl font-bold text-primary">Login</h2>
            </ModalHeader>
            <ModalBody>
              <Input type="text" label="Username" />
              <Input type="password" label="Password" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
