import {
  Table,
  Group,
  Text,
  ScrollArea,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllComments, useDeleteComment } from "../hooks/comments.api";
import { useProducts } from "../hooks/products.api";
import DeleteCommentsModal from "../components/DeleteCommentsModal";

const jobColors: Record<string, string> = {
  live: "green",
  suspended: "Gray",
  pending: "orange",
  blocked: "red",
  development: "grape",
};

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
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface IComment {
  id: string;
  name: string;
  comment: string;
  pictureUrl: string;
  status: string;
}

export const ComplaintsTable = () => {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editItem, setEditItem] = useState<IComment | undefined>(undefined);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | undefined>(
    undefined
  );

  const deleteCommentMutation = useDeleteComment();

  // Fetch comments and products
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useAllComments();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  if (commentsLoading || productsLoading) return <Text>Loading...</Text>;
  if (commentsError)
    return <Text>Error fetching comments: {commentsError.message}</Text>;
  if (productsError)
    return <Text>Error fetching products: {productsError.message}</Text>;

  // Create a map of product IDs to names
  const productMap = new Map(
    products.map((product) => [product.id, product.name])
  );

  console.log("Fetched comments:", comments);

  const handleDelete = () => {
    if (deleteItemId) {
      deleteCommentMutation.mutate(deleteItemId);
      setDeleteModalOpened(false);
    }
  };

  const rowsC = comments?.map((comment) => (
    <tr key={comment.id}>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {comment.name}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {comment.comment}
          </Text>
        </Group>
      </td>
      <td>
        <Group spacing="sm" position="center">
          <Text fz="sm" fw={500}>
            {productMap.get(comment.listingId) || "Unknown Product"}
          </Text>
        </Group>
      </td>
      <td>
        <Group position="center">
          <Button
            color={jobColors.blocked}
            variant="outline"
            radius="sm"
            onClick={() => {
              setDeleteItemId(comment.id);
              setDeleteModalOpened(true);
            }}
          >
            Reject
          </Button>
        </Group>
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
              <th style={{ textAlign: "center" }}>Comment</th>
              <th style={{ textAlign: "center" }}>ProductName</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>{rowsC}</tbody>
        </Table>
      </ScrollArea>
      <DeleteCommentsModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onDelete={handleDelete}
      />
    </>
  );
};
