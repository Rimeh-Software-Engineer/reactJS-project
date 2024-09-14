import React, { useState } from "react";
import {
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconPlus } from "@tabler/icons-react";
import { useCreateCategory } from "../hooks/categories.api"; // Ensure the path to your hook is correct
import { useQueryClient } from "@tanstack/react-query"; // Import query client

const CreateCategoryModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryName, setCategoryName] = useState("");
  const { mutate: createCategory, isLoading } = useCreateCategory();
  const queryClient = useQueryClient(); // Initialize query client

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (categoryName.trim()) {
      createCategory(
        { name: categoryName },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["categories"]); // Invalidate the categories query
            setCategoryName(""); // Clear the form
            close(); // Close the modal
          },
          onError: (error) => {
            console.error("Failed to create category:", error);
          },
        }
      );
    }
  };

  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create A New Category"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <SimpleGrid cols={1} spacing="md">
            <Grid gutter="md">
              <Grid.Col span={12}>
                <TextInput
                  required
                  type="text"
                  name="name"
                  label="Category Name"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Grid.Col>

              <Grid.Col span={12} style={{ textAlign: "center" }}>
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

export default CreateCategoryModal;
