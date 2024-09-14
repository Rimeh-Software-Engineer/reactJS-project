import React, { useState } from "react";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  createStyles,
  rem,
  Tooltip,
  Center,
} from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "../hooks/categories.api";
import DeleteCategoriesModal from "./DeleteCategoriesModal";
import EditCategoryModal from "../components/EditCategoriesModal"; // Ensure the path is correct

const useStyles = createStyles((theme) => ({
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  header: {
    zIndex: 100,
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
}));

export const CategoriesTable = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [modalOpened, setModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Fetch categories
  const { data: categories, isLoading, error } = useCategories();
  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const openDeleteModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setModalOpened(true);
  };

  const openEditModal = (category: { id: string; name: string }) => {
    setCategoryToEdit(category);
    setEditModalOpened(true);
  };

  const handleDelete = () => {
    if (selectedCategoryId) {
      deleteCategory(selectedCategoryId, {
        onSuccess: () => {
          setModalOpened(false);
          setSelectedCategoryId(null);
        },
        onError: (error) => {
          console.error("Failed to delete category:", error);
        },
      });
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching categories: {error.message}</Text>;

  const rows = categories?.map((category) => (
    <tr key={category.id}>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {category.name}
          </Text>
        </Group>
      </td>
      <td>
        <Center>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => navigate(`/categories/${category.id}`)}>
              <Tooltip label="Details">
                <IconEye size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon onClick={() => openEditModal(category)}>
              <Tooltip label="Edit">
                <IconPencil size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              onClick={() => openDeleteModal(category.id)}
              loading={isDeleting}
              disabled={isDeleting}
            >
              <Tooltip label="Delete">
                <IconTrash size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
          </Group>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea
        h={400}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      {/* Delete Confirmation Modal */}
      <DeleteCategoriesModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onDelete={handleDelete}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        editItem={categoryToEdit || undefined}
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
};
