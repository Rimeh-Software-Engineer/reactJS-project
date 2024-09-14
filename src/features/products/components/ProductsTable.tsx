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
import { useProducts, useDeleteProduct } from "../hooks/products.api"; // Ensure the path to your hook is correct
import DeleteUsersModal from "../components/DeleteProductsModal";

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

export const ProductsTable = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // Fetch products
  const { data: products, isLoading, error } = useProducts();

  // Handle product deletion
  const deleteProductMutation = useDeleteProduct();

  const handleDeleteProduct = () => {
    if (selectedProductId) {
      deleteProductMutation.mutate(selectedProductId, {
        onSuccess: () => {
          setSelectedProductId(null);
        },
      });
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching products: {error.message}</Text>;

  const rows = products?.map((product) => (
    <tr key={product.id}>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {product.id}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {product.name}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {product.description}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {product.price ? `${product.price.toFixed(2)}dt` : "N/A"}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {product.previousPrice
              ? `${product.previousPrice.toFixed(2)}dt`
              : "N/A"}
          </Text>
        </Group>
      </td>
      <td>
        <Center>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => navigate(`/products/${product.id}`)}>
              <Tooltip label="Details">
                <IconEye size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                // Implement edit functionality here
              }}
            >
              <Tooltip label="Edit">
                <IconPencil size="1.2rem" stroke={1.5} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                setSelectedProductId(product.id);
                setDeleteModalOpened(true);
              }}
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
              <th style={{ textAlign: "center" }}>Product ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>New Price</th>
              <th style={{ textAlign: "center" }}>Previous Price</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <DeleteUsersModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onDelete={handleDeleteProduct}
      />
    </>
  );
};
