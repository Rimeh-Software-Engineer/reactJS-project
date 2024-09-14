import React from "react";
import { Modal, Button, Group } from "@mantine/core";

interface DeleteOfferModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteOfferModal = ({
  opened,
  onClose,
  onDelete,
}: DeleteOfferModalProps) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Delete Confirmation">
      <p>Are you sure you want to delete this offer?</p>
      <Group position="right">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="filled" color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteOfferModal;
