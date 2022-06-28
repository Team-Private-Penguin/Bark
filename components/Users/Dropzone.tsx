import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7} align="center">
        Attach Files Here
      </Text>
    </div>
  </Group>
);

interface Props {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageDropzone: React.FC<Props> = ({ setImage }) => {
  const theme = useMantineTheme();

  const uploadImages = (files: any): void => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", files[0]);
    bodyFormData.append("upload_preset", "mjm5khfu");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dppbuevux/image/upload",
        bodyFormData
      )
      .then((response) => setImage(response.data.url))
      .catch((error) => console.error(error));
  };

  return (
    <Dropzone
      onDrop={(files) => uploadImages(files)}
      onReject={(files) => console.log("rejected files", files)}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
};

export default ImageDropzone;
