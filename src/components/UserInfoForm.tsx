import UserForm from "./UserForm";
import { setMyCookie } from "@/lib/actions/setMyCookie";
import { User } from "@/types";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import React, { useState } from "react";
import Loader from "./Loader";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  updateUser: (data: User) => void
};

export default function UserInfoForm ({ user, isOpen, onClose, updateUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ({userName, jobTitle}: { userName: string, jobTitle: string }) => {
    setIsLoading(true);

    setMyCookie("user", JSON.stringify({ userName, jobTitle }));

    setTimeout(() => {
      setIsLoading(false);
      updateUser({ userName, jobTitle });
      onClose();
    }, 0);
  };

  return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your information</ModalHeader>
            <ModalCloseButton />
            {isLoading && <Loader />}
            {!isLoading && <UserForm title="" submitFunction={handleSubmit} initialData={user} />}
          </ModalContent>
        </Modal>
      </>
  );
}
