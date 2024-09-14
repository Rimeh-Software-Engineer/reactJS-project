import React, { useState } from "react";
import {
  Button,
  Grid,
  Group,
  Modal,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconPlus, IconDatabase } from "@tabler/icons-react";

const jobColors: Record<string, string> = {
  live: "green",
  suspended: "Gray",
  pending: "orange",
  blocked: "red",
  development: "grape",
};

const CreateFeedbacksModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [usersForm, setUsersForm] = useState({
    name: "",
    email: "",
    role: "",
    //user_id: undefined,
  });
  const [formErrors, setFormErrors] = useState({
    data: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: any) => {
    setUsersForm({
      ...usersForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    setIsLoading(false);
    close();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormErrors({
      data: null,
    });
    setIsLoading(true);
  };
  const userOptions = [
    { value: 1, label: "Ali" },
    { value: 2, label: "Ahmed" },
  ];
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

export default CreateFeedbacksModal;
