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
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconPlus } from "@tabler/icons-react";

interface IDataTableType {
  id: number;
  name: string;
  role: string;
  // user_id?: number;
}

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
    name: "",
    email: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState({
    data: null,
  });
  useEffect(() => {
    if (editItem) {
      setUsersForm({
        name: editItem.name,
        email: editItem.email,
        role: editItem.role,
        // user_id: editItem.user_id !== undefined ? String(editItem.user_id) : "",
      });
    }
  }, [editItem]);
  const handleTextChange = (e: any) => {
    setUsersForm({
      ...usersForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (value: any, name: any) => {
    setUsersForm({
      ...usersForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormErrors({
      data: null,
    });
  };

  const userOptions = [
    { value: "1", label: "Ali" },
    { value: "2", label: "Ahmad" },
  ];
  return (
    <>
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
                  label="Aggregator Role"
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
    </>
  );
};

export default EditUsersModal;
