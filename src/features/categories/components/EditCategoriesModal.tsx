import React, { useState, useEffect } from "react";
import { Button, Modal, TextInput, Grid } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useUpdateCategory } from "../hooks/categories.api"; // Ensure the path is correct

interface EditCategoryModalProps {
  editItem?: { id: string; name: string };
  opened: boolean;
  onClose: () => void;
}

const EditCategoryModal = ({
  editItem,
  opened,
  onClose,
}: EditCategoryModalProps) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
    }
  }, [editItem]);

  const { mutate: updateCategory } = useUpdateCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateCategory(
        { id: editItem.id, name },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Failed to update category:", error);
          },
        }
      );
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Category" size="xl">
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              required
              label="Category Name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={12} style={{ textAlign: "center" }}>
            <Button leftIcon={<IconPencil size="1rem" />} type="submit">
              Update
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
