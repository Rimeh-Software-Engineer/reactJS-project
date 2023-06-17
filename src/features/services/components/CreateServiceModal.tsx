import React, { useState } from "react";
import {
  Button,
  FileInput,
  Grid,
  Group,
  Loader,
  Modal,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDatabase, IconFile, IconPlus } from "@tabler/icons-react";
import { useMarketplaces } from "../hooks/marketplaces.api";
import { useServiceProviders } from "../hooks/service.providers.api";
import { useServiceSubscriptionTypes } from "../hooks/service.subscription.types.api";
import { useServiceStatuses } from "../hooks/service.statuses.api";
import { useCreateService } from "../hooks/service.api";
import { FileWithPath } from "@mantine/dropzone";
import CustomFileInput from "./CustomFileInput";

const CreateServiceModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    marketplace_id: "",
    service_provider_id: "",
    service_subscription_type_id: "",
    service_status_id: "",
    type: "",
  });
  const [formErrors, setFormErrors] = useState({
    data: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (files: any) => {
    setUploadedFiles(files);
  };
  const marketplacesQuery = useMarketplaces();
  const serviceProvidersQuery = useServiceProviders();
  const serviceStatusesQuery = useServiceStatuses();
  const serviceSubscriptionTypesQuery = useServiceSubscriptionTypes();
  const createServiceMutation = useCreateService();

  const marketplaces = marketplacesQuery?.data?.data.map((item) => ({
    value: item.id.toString(),
    label: item.name.toUpperCase(),
  }));

  const serviceProviders = serviceProvidersQuery?.data?.data.map((item) => ({
    value: item.id.toString(),
    label: item.name.toUpperCase(),
  }));

  const serviceStatuses = serviceStatusesQuery?.data?.data.map((item) => ({
    value: item.id.toString(),
    label: item.name.toUpperCase(),
  }));

  const serviceSubscriptionTypes =
    serviceSubscriptionTypesQuery?.data?.data.map((item) => ({
      value: item.id.toString(),
      label: item.name.toUpperCase(),
    }));

  const handleTextChange = (e: any) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (value: any, name: any) => {
    setServiceForm({
      ...serviceForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    console.log(uploadedFiles);
    e.preventDefault();
    setFormErrors({
      data: null,
    });
    try {
      if (serviceForm?.type === "purchase") {
        serviceForm.service_subscription_type_id = "1";
      }
      const formData = new FormData();

      for (const [key, value] of Object.entries(serviceForm)) {
        formData.append(key, value);
      }

      if (Array.isArray(uploadedFiles)) {
        uploadedFiles.forEach((file, index) => {
          formData.append(`logo[${index}]`, file);
        });
      } else {
        formData.append(`logo[${0}]`, uploadedFiles);
      }
      setUploadedFiles([]);
      await createServiceMutation.mutateAsync(formData);
      close();
      setServiceForm({
        name: "",
        description: "",
        marketplace_id: "",
        service_provider_id: "",
        service_subscription_type_id: "",
        service_status_id: "",
        type: "",
      });
    } catch (error) {
      const errorsObject = error?.response?.data;
      setFormErrors(errorsObject);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create A New Service"
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
                  name="name"
                  label="Service Name"
                  placeholder="Name"
                  withAsterisk
                  onChange={handleTextChange}
                  value={serviceForm?.name}
                  error={formErrors?.data?.name}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  required
                  name="description"
                  placeholder="Description"
                  label="Service Description"
                  withAsterisk
                  onChange={handleTextChange}
                  value={serviceForm?.description}
                  error={formErrors?.data?.description}
                />
              </Grid.Col>
              <Grid.Col lg={6} md={6} sm={12}>
                <Select
                  required
                  label="Marketplace"
                  name="marketplace_id"
                  placeholder="Pick One"
                  maxDropdownHeight={280}
                  nothingFound="No options"
                  searchable
                  clearable
                  allowDeselect
                  data={marketplaces ?? []}
                  disabled={
                    marketplacesQuery.isLoading || marketplacesQuery.isError
                  }
                  onChange={(e) => handleSelectChange(e, "marketplace_id")}
                  value={serviceForm?.marketplace_id}
                  error={formErrors?.data?.marketplace_id}
                />
              </Grid.Col>
              <Grid.Col lg={6} md={6} sm={12}>
                <Select
                  required
                  label="Service Provider"
                  name="service_provider_id"
                  placeholder="Pick one"
                  maxDropdownHeight={280}
                  nothingFound="No options"
                  searchable
                  clearable
                  allowDeselect
                  data={serviceProviders ?? []}
                  disabled={
                    serviceProvidersQuery.isLoading ||
                    serviceProvidersQuery.isError
                  }
                  onChange={(e) => handleSelectChange(e, "service_provider_id")}
                  value={serviceForm?.service_provider_id}
                  error={formErrors?.data?.service_provider_id}
                />
              </Grid.Col>
              <Grid.Col lg={6} md={6} sm={12}>
                <Select
                  required
                  label="Type"
                  name="type"
                  placeholder="Pick one"
                  maxDropdownHeight={280}
                  nothingFound="No options"
                  searchable
                  clearable
                  allowDeselect
                  data={[
                    { label: "PURCHASE", value: "purchase" },
                    { label: "SUBSCRIPTION", value: "subscription" },
                  ]}
                  disabled={
                    serviceStatusesQuery.isLoading ||
                    serviceStatusesQuery.isError
                  }
                  onChange={(e) => handleSelectChange(e, "type")}
                  value={serviceForm?.type}
                  error={formErrors?.data?.type}
                />
              </Grid.Col>
              {serviceForm?.type === "subscription" && (
                <Grid.Col lg={6} md={6} sm={12}>
                  <Select
                    required
                    label="Service Subscription Type"
                    name="service_subscription_type_id"
                    placeholder="Pick one"
                    maxDropdownHeight={280}
                    nothingFound="No options"
                    searchable
                    clearable
                    allowDeselect
                    data={serviceSubscriptionTypes ?? []}
                    disabled={
                      serviceSubscriptionTypesQuery.isLoading ||
                      serviceSubscriptionTypesQuery.isError
                    }
                    onChange={(e) =>
                      handleSelectChange(e, "service_subscription_type_id")
                    }
                    value={serviceForm?.service_subscription_type_id}
                    error={formErrors?.data?.service_subscription_type_id}
                  />
                </Grid.Col>
              )}
              <Grid.Col lg={6} md={6} sm={12}>
                <Select
                  required
                  label="Service Status"
                  name="service_status_id"
                  placeholder="Pick one"
                  maxDropdownHeight={280}
                  nothingFound="No options"
                  searchable
                  clearable
                  allowDeselect
                  data={serviceStatuses ?? []}
                  disabled={
                    serviceStatusesQuery.isLoading ||
                    serviceStatusesQuery.isError
                  }
                  onChange={(e) => handleSelectChange(e, "service_status_id")}
                  value={serviceForm?.service_status_id}
                  error={formErrors?.data?.service_status_id}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <CustomFileInput
                  label="Images"
                  placeholder="Service logos"
                  multiple
                  accept="image/png,image/jpeg"
                  onFileUpload={handleFileUpload}
                  error={formErrors?.data?.logo}
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
                  loading={createServiceMutation.isLoading}
                  type="submit"
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
        >
          Create new
        </Button>
      </Group>
    </>
  );
};

export default CreateServiceModal;
