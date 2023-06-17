import React, { useState } from "react";
import { Text, Image, SimpleGrid } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type CustomDropzoneProps = {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
};
const CustomDropzone = ({ files, setFiles }: CustomDropzoneProps) => {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </div>
  );
};
export default CustomDropzone;
