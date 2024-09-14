import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";

interface DeleteModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteService = ({ opened, onClose, onDelete }: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Delete Confirmation">
      <p>Are you sure you want to delete this provider?</p>
      <Group position="right">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="error" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteService;
