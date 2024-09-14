// src/components/RecommendationsTable.tsx
import React from "react";
import {
  Table,
  Group,
  Text,
  Tooltip,
  createStyles,
  rem,
  Center,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useAllRecommendations } from "../hooks/recommendations.api";
import { useUsers } from "../../users/hooks/users.api";
import { useProducts } from "../../products/hooks/products.api";

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

export const RecommendationsTable = () => {
  const { classes, cx } = useStyles();
  const {
    data: allRecommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useAllRecommendations();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: products, isLoading: productsLoading } = useProducts();

  if (recommendationsError)
    return (
      <Text>
        Error fetching recommendations: {recommendationsError.message}
      </Text>
    );

  if (recommendationsLoading || usersLoading || productsLoading)
    return <Text>Loading...</Text>;

  // Flatten the allRecommendations object
  const flattenedRecommendations = Object.entries(allRecommendations).flatMap(
    ([userId, recommendations]) =>
      recommendations.map((rec) => ({ userId, ...rec }))
  );

  // Create lookup maps for users and products
  const userMap = new Map(users?.map((user) => [user.id, user.email]));
  const productMap = new Map(
    products?.map((product) => [product.id, product.name])
  );

  const rows = flattenedRecommendations.map((rec) => {
    const userEmail = userMap.get(rec.userId) || "Unknown";
    const productName = productMap.get(rec.item_id) || "Unknown";

    return (
      <tr key={`${rec.userId}-${rec.item_id}`}>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {rec.userId}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {userEmail}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm" position="center">
            <Text fz="sm" fw={500}>
              {rec.item_id}
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
          <Center>
            <Group spacing={0} position="right">
              <Tooltip label="Details">
                <IconEye size="1.2rem" stroke={1.5} />
              </Tooltip>
            </Group>
          </Center>
        </td>
      </tr>
    );
  });

  return (
    <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
      <thead className={cx(classes.header)}>
        <tr>
          <th style={{ textAlign: "center" }}>User ID</th>
          <th style={{ textAlign: "center" }}>User Email</th>

          <th style={{ textAlign: "center" }}>Product ID</th>
          <th style={{ textAlign: "center" }}>Product Name</th>

          <th style={{ textAlign: "center" }}>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
