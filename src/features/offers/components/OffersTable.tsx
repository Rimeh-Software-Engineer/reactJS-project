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
import { useOffers } from "../hooks/offers.api";
import { useProducts } from "../hooks/products.api";
import { useUsers } from "../hooks/users.api";
import { useDeleteOffer } from "../hooks/offers.api"; // Import the delete hook
import DeleteOfferModal from "../components/DeleteOffersModal"; // Import the delete modal

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

export const OffersTable = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false); // State for edit modal
  const [selectedOffer, setSelectedOffer] = useState(null); // State for selected offer

  // Fetch offers, products, and users
  const {
    data: offers,
    isLoading: offersLoading,
    error: offersError,
  } = useOffers();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();
  const { mutate: deleteOffer } = useDeleteOffer(); // Use the delete offer mutation

  if (offersLoading || productsLoading || usersLoading)
    return <Text>Loading...</Text>;
  if (offersError)
    return <Text>Error fetching offers: {offersError.message}</Text>;
  if (productsError)
    return <Text>Error fetching products: {productsError.message}</Text>;
  if (usersError)
    return <Text>Error fetching users: {usersError.message}</Text>;

  // Create a map of product IDs to names
  const productMap = new Map(
    products.map((product) => [product.id, product.name])
  );

  // Create a map of user IDs to names, filtering only merchants
  const userMap = new Map(
    users
      .filter((user) => user.role === "merchant")
      .map((user) => [user.id, user.name])
  );

  const openDeleteModal = (offerId: string) => {
    setSelectedOfferId(offerId);
    setDeleteModalOpened(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
    setSelectedOfferId(null);
  };

  const openEditModal = (offer: any) => {
    setSelectedOffer(offer);
    setEditModalOpened(true);
  };

  const handleDelete = async () => {
    if (selectedOfferId) {
      try {
        await deleteOffer(selectedOfferId);
        // Optionally refetch offers or update state
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete offer:", error);
      }
    }
  };

  const rows = offers?.map((offer) => {
    const productName = productMap.get(offer.productId) || "Unknown Product";
    const userName = userMap.get(offer.userId) || "Unknown User";

    return (
      <tr key={offer.id}>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {offer.title}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {offer.description}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {productName}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {userName}
            </Text>
          </Group>
        </td>
        <td>
          <Center>
            <Group spacing={0} position="right">
              <ActionIcon onClick={() => navigate(`/offers/${offer.id}`)}>
                <Tooltip label="Details">
                  <IconEye size="1.2rem" stroke={1.5} />
                </Tooltip>
              </ActionIcon>
              <ActionIcon
              // Open the edit modal with selected offer data
              >
                <Tooltip label="Edit">
                  <IconPencil size="1.2rem" stroke={1.5} />
                </Tooltip>
              </ActionIcon>
              <ActionIcon onClick={() => openDeleteModal(offer.id)}>
                <Tooltip label="Delete">
                  <IconTrash size="1.2rem" stroke={1.5} />
                </Tooltip>
              </ActionIcon>
            </Group>
          </Center>
        </td>
      </tr>
    );
  });

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
              <th style={{ textAlign: "center" }}>Title</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Product Name</th>
              <th style={{ textAlign: "center" }}>Merchant</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {selectedOfferId && (
        <DeleteOfferModal
          opened={deleteModalOpened}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
