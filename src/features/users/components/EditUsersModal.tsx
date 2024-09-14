import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Modal,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { useUpdateUser } from "../hooks/users.api"; // Adjust path accordingly

const EditUsersModal = ({
  editItem,
  opened,
  onClose,
}: {
  editItem?: IDataTableType;
  opened: boolean;
  onClose: () => void;
}) => {
  const [usersForm, setUsersForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState({
    data: null,
  });
  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    if (editItem) {
      setUsersForm({
        id: editItem.id.toString(), // Ensure ID is a string
        name: editItem.name,
        email: editItem.email,
        role: editItem.role,
      });
    }
  }, [editItem]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersForm({
      ...usersForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({
      data: null,
    });

    try {
      await updateUser(usersForm);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      setFormErrors({ data: error.message });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User" size="xl">
      <form onSubmit={handleSubmit}>
        <SimpleGrid
          cols={1}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Grid gutter="md">
            <Grid.Col span={12}>
              <TextInput
                required
                type="text"
                name="name"
                label="Name"
                placeholder="Name"
                withAsterisk
                onChange={handleTextChange}
                value={usersForm?.name}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                required
                type="email"
                name="email"
                label="Email Address"
                placeholder="Email Address"
                withAsterisk
                onChange={handleTextChange}
                value={usersForm?.email}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                required
                name="role"
                placeholder="Role"
                label="Role"
                withAsterisk
                onChange={handleTextChange}
                value={usersForm?.role}
              />
            </Grid.Col>
            <Grid.Col
              span={12}
              style={{
                textAlign: "center",
              }}
            >
              <Button leftIcon={<IconFile size="1rem" />} type="submit">
                Update
              </Button>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default EditUsersModal;
