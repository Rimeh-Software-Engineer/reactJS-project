import React from "react";
import { Modal, Button, Group } from "@mantine/core";

interface DeleteModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUsersModal = ({ opened, onClose, onDelete }: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Delete Confirmation">
      <p>Are you sure you want to delete this User?</p>
      <Group position="right">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="error" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteUsersModal;
