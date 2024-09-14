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
import { IconFile, IconPlus } from "@tabler/icons-react";
import { useCreateProduct } from "../hooks/products.api";
import { useCategories } from "../../categories/hooks/categories.api";

const CreateProductsModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    previousPrice: "",
    description: "",
    categoryId: "",
    image: null, // New state to hold the image file
  });
  const [formErrors, setFormErrors] = useState({
    data: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const createProductMutation = useCreateProduct();

  const handleTextChange = (e: any) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setProductForm({
      ...productForm,
      categoryId,
    });
  };

  const handleFileChange = (e: any) => {
    setProductForm({
      ...productForm,
      image: e.target.files[0], // Update the state with the selected file
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

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("previousPrice", productForm.previousPrice || "");
    formData.append("description", productForm.description);
    formData.append("categoryId", productForm.categoryId);
    if (productForm.image) {
      formData.append("image", productForm.image); // Append the image file to the form data
    }

    try {
      await createProductMutation.mutateAsync(formData);
      handleClose();
    } catch (error) {
      setFormErrors({
        data: error.response?.data || "An error occurred",
      });
      setIsLoading(false);
    }
  };

  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Create A New Product"
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
                  label="Product Name"
                  placeholder="Product Name"
                  withAsterisk
                  onChange={handleTextChange}
                  value={productForm?.name}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  required
                  type="number"
                  name="price"
                  label="Price"
                  placeholder="Price"
                  withAsterisk
                  onChange={handleTextChange}
                  value={productForm?.price}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  type="number"
                  name="previousPrice"
                  label="Previous Price"
                  placeholder="Previous Price (optional)"
                  onChange={handleTextChange}
                  value={productForm?.previousPrice}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  required
                  name="description"
                  placeholder="Description"
                  label="Product Description"
                  withAsterisk
                  onChange={handleTextChange}
                  value={productForm?.description}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  required
                  label="Category"
                  placeholder="Select category"
                  data={
                    categories?.map((category) => ({
                      value: category.id,
                      label: category.name,
                    })) || []
                  }
                  value={productForm.categoryId}
                  onChange={handleCategoryChange}
                  loading={isCategoriesLoading}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange} // Handle the file selection
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

export default CreateProductsModal;
