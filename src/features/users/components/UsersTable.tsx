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
import EditUsersModal from "./EditUsersModal";
import DeleteUsersModal from "./DeleteUsersModal";
import { useDeleteUser } from "../hooks/users.api";

// Define styles for the component
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

// Define the interface for the user object
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define the interface for the component props
interface UsersTableProps {
  data: User[];
}

// Define the UsersTable component
export const UsersTable: React.FC<UsersTableProps> = ({ data }) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { mutate: deleteUser } = useDeleteUser();

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalOpened(true);
  };

  const closeEditModal = () => {
    setEditModalOpened(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setSelectedUser(null);
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
    closeDeleteModal();
  };

  if (data.length === 0) {
    return (
      <Center>
        <Text>No users found</Text>
      </Center>
    );
  }
  // Map through the data array to create rows
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Center>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.id}
            </Text>
          </Group>
        </Center>
      </td>
      <td>
        <Center>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Center>
      </td>
      <td>
        <Center>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.email}
            </Text>
          </Group>
        </Center>
      </td>
      <td>
        <Center>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.role}
            </Text>
          </Group>
        </Center>
      </td>
      <td>
        <Center>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => navigate(`/users/${item.id}`)}>
              <Tooltip label="Details">
                <IconEye size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon onClick={() => openEditModal(item)}>
              <Tooltip label="Edit">
                <IconPencil size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon onClick={() => openDeleteModal(item)}>
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
    <ScrollArea
      h={400}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th style={{ textAlign: "center" }}>User ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {selectedUser && (
        <EditUsersModal
          opened={editModalOpened}
          onClose={closeEditModal}
          editItem={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteUsersModal
          opened={deleteModalOpened}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </ScrollArea>
  );
};
