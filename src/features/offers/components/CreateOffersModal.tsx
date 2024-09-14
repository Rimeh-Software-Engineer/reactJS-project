import React, { useState } from "react";
import {
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  TextInput,
  Textarea,
  Select,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconPlus } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateOffer } from "../hooks/offers.api"; // Import the hook
import { useUsers } from "../hooks/users.api"; // Import the useUsers hook
import { useProducts } from "../hooks/products.api"; // Import the useProducts hook

const CreateOffersModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    discount: "",
    productId: "",
    userId: "",
    expiredDate: null,
  });
  const [formErrors, setFormErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createOffer } = useCreateOffer();
  const { data: users, isLoading: usersLoading } = useUsers(); // Fetch users
  const { data: products, isLoading: productsLoading } = useProducts(); // Fetch products

  const handleTextChange = (e) => {
    setOfferForm({
      ...offerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setOfferForm({
      ...offerForm,
      expiredDate: date,
    });
  };

  const handleClose = () => {
    setIsLoading(false);
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(null);
    setIsLoading(true);
    try {
      await createOffer(offerForm);
      handleClose();
    } catch (error) {
      setFormErrors(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useMantineTheme();

  // Filter for merchants only
  const merchantOptions = users
    ?.filter((user) => user.role === "merchant") // Assuming 'merchant' is the role for merchants
    .map((user) => ({
      value: user.id,
      label: user.name,
    }));

  // Prepare options for products
  const productOptions = products?.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Create a New Offer"
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
                  name="title"
                  label="Title"
                  placeholder="Title"
                  onChange={handleTextChange}
                  value={offerForm.title}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  required
                  name="description"
                  placeholder="Description"
                  label="Description"
                  onChange={handleTextChange}
                  value={offerForm.description}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  required
                  name="discount"
                  label="Discount"
                  placeholder="Discount"
                  onChange={handleTextChange}
                  value={offerForm.discount}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  required
                  name="productId"
                  label="Product"
                  placeholder="Select product"
                  data={productOptions || []}
                  value={offerForm.productId}
                  onChange={(value) =>
                    setOfferForm({ ...offerForm, productId: value })
                  }
                  loading={productsLoading}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  required
                  name="userId"
                  label="Merchant"
                  placeholder="Select merchant"
                  data={merchantOptions || []}
                  value={offerForm.userId}
                  onChange={(value) =>
                    setOfferForm({ ...offerForm, userId: value })
                  }
                  loading={usersLoading}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <label>Expiration Date</label>
                <DatePicker
                  selected={offerForm.expiredDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select expiration date"
                  className="form-control"
                />
              </Grid.Col>

              <Grid.Col span={12} style={{ textAlign: "center" }}>
                <Button
                  leftIcon={<IconFile size="1rem" />}
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
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

export default CreateOffersModal;
