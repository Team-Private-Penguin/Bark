import { forwardRef, useState, useEffect } from "react";
import {
  Center,
  Button,
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
  Autocomplete,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Input({ userId }) {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const form = useForm({ initialValues: { name: "" } });
  const router = useRouter()

  const defaultPhoto =
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

  useEffect(() => {
    console.log('rhwhrhrr')
    axios.get("/api/allevents").then((res) => {
      const mappedEvents = res.data.map((event) => {
        const timestamp = new Date(event.date);
        return {
          id: event.event_id,
          value: event.name,
          gName: event.gname,
          description: event.description,
          date: timestamp.toLocaleString([], { dateStyle: "short" }),
          groupId: event.group_id
        };
      });
      setData(mappedEvents);
    });
  }, []);

  useEffect(() => {
    form.reset()
  }, [router]);

  interface ItemProps extends SelectItemProps {
    color: MantineColor;
    description: string;
    image: string;
    date: string;
    gName: string;
    groupId: string;
  }

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    (
      { value, groupId, image, description, date, gName, id, ...others }: ItemProps,
      ref
    ) => (
      <div ref={ref} {...others} key={id}>
          <Group noWrap >
            <Avatar src={defaultPhoto} />
            <div className="w-[10%]">
              <Text size="xs">{date}</Text>
            </div>

            <div>
              <Text underline>{value}</Text>
              <div className="ml-2">
                <Text size="xs" color="">
                  {gName}
                </Text>
                <Text size="xs" color="dimmed">
                  {description}
                </Text>
              </div>
            </div>
          </Group>
        </div>
    )
  );

  return (
    <>
      <Autocomplete
        placeholder="Search Events"
        itemComponent={AutoCompleteItem}
        data={data}
        filter={(value, item) =>
          item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim())
        }
        className="autocomplete mr-[250px]"
        value={form.values.name}
        onChange={(event) => {
          form.setFieldValue("name", event);
        }}
        limit={15}
        radius="xl"
        size="sm"
        styles={{
          input: { width: '500px' },
        }}
        onItemSubmit={(item) => router.push(`/group?id=${item.groupId}`)}
      />
    </>
  );
}
