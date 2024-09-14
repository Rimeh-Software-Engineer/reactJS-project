import React, { useState } from "react";
import {
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  TextInput,
  Textarea,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconPlus } from "@tabler/icons-react";
import { useCreateUser } from "../hooks/users.api";

const CreateUsersModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [usersForm, setUsersForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUserMutation = useCreateUser();

  const handleTextChange = (e) => {
    setUsersForm({
      ...usersForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setIsLoading(false);
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors(null);

    try {
      await createUserMutation.mutateAsync(usersForm);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      const errors = error.response?.data?.message || "An error occurred.";
      setFormErrors(errors);
      setIsLoading(false);
    }
  };

  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Create A New User"
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <SimpleGrid
            cols={1}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            {formErrors && (
              <Grid.Col span={12}>
                <Text color="red">{formErrors}</Text>
              </Grid.Col>
            )}

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
                <TextInput
                  required
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  withAsterisk
                  onChange={handleTextChange}
                  value={usersForm?.password}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  required
                  name="role"
                  placeholder="Role (merchant or customer)"
                  label="User Role"
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
                <Button
                  leftIcon={<IconFile size="1rem" />}
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  loaderProps={{ color: "gray" }}
                >
                  Create
                </Button>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </form>
      </Modal>

      <Group position="center">
        <Button
          onClick={open}
          rightIcon={<IconPlus size="1.05rem" stroke={1.5} />}
          pr={12}
          style={{ backgroundColor: theme.colors.brand[0] }}
        >
          Create new
        </Button>
      </Group>
    </>
  );
};

export default CreateUsersModal;
