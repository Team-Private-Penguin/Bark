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
  Tabs,
  Modal,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import UserModal from "./Friends/UserModal";

export default function Input({ userId }) {
  const [clicked, setClicked] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const form = useForm({ initialValues: { name: "" } });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const defaultPhoto =
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
  useEffect(() => {
    if (activeTab === 2) {
      axios.get("/api/allevents").then((res) => {
        const mappedEvents = res.data.map((event) => {
          const timestamp = new Date(event.date);
          return {
            user_id: event.event_id,
            value: event.name,
            gName: event.gname,
            description: event.description,
            date: timestamp.toLocaleString([], { dateStyle: "short" }),
            groupId: event.group_id,
          };
        });
        setData(mappedEvents);
      });
    } else if (activeTab === 1) {
    } else if (activeTab === 0) {
      axios.get("/api/allusers").then((res) => {
        console.log(res.data);
        const mappedEvents = res.data.map((userInfo) => {
          return {
            user_id: userInfo.user_id,
            value: userInfo.name,
            groupId: userInfo.group_id,
            image: userInfo.photo,
            underline: true,
            size:
              userInfo.size.charAt(0).toUpperCase() + userInfo.size.slice(1),
            energy: userInfo.energy.charAt(0).toUpperCase() + userInfo.energy.slice(1),
            dogs: userInfo.f_dogs.charAt(0).toUpperCase() + userInfo.f_dogs.slice(1),
            people: userInfo.f_people.charAt(0).toUpperCase() + userInfo.f_people.slice(1),
            zip: userInfo.zipcode,
          };
        });
        setData(mappedEvents);
      });
    }
    if (activeTab === 3) setActiveTab(0);
  }, [activeTab, modal]);

  useEffect(() => {
    form.reset();
  }, [router]);

  interface ItemProps extends SelectItemProps {
    color: MantineColor;
    description: string;
    image: string;
    date: string;
    gName: string;
    groupId: string;
    underline: boolean;
    user_id: string;
    size: string;
    energy: string;
    dogs: string;
    people: string;
    zip: string;
  }

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    (
      {
        value,
        groupId,
        image,
        description,
        date,
        gName,
        user_id,
        underline,
        size,
        energy,
        dogs,
        people,
        zip,
        ...others
      }: ItemProps,
      ref
    ) => (
      <div ref={ref} {...others} key={user_id}>
        <Group noWrap>
          <Avatar src={image || defaultPhoto} />
          {activeTab !== 0 && (
            <div className="w-[10%]">
              <Text size="xs">{date}</Text>
            </div>
          )}

          <div className="w-[50%]">
            {underline ? <Text>{value}</Text> : <Text underline>{value}</Text>}
            <div className="ml-2">
              <Text size="xs" color="">
                {gName}
              </Text>
              <Text size="xs" color="dimmed">
                {description}
              </Text>
            </div>
          </div>
          {activeTab === 0 && (
            <Stack className="gap-0 w-[40%] ">
              <Text size="xs" color="dimmed">
                Size: {size}
              </Text>
              <Text size="xs" color="dimmed">
                Energy: {energy}
              </Text>
              <Text size="xs" color="dimmed">
                Dogs: {dogs}
              </Text>
              <Text size="xs" color="dimmed">
                People: {people}
              </Text>
              <Text size="xs" color="dimmed">
                Zipcode: {zip}
              </Text>
            </Stack>
          )}
        </Group>
      </div>
    )
  );

  return (
    <div className="ml-[33%]">
      <Tabs
        color="dark"
        position="center"
        active={activeTab}
        onTabChange={setActiveTab}
        classNames={{
          tabControl: "uppercase font-bold text-white",
        }}
      >
        <Tabs.Tab label="USERS">
          {" "}
          <Autocomplete
            placeholder="Search Users"
            itemComponent={AutoCompleteItem}
            data={data}
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim()) || item.size.toLowerCase().includes(value.toLowerCase().trim())
            }
            className="autocomplete"
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue("name", event);
            }}
            limit={15}
            radius="xl"
            size="xs"
            styles={{
              input: { width: "350px" },
            }}
            onItemSubmit={(item) => {
              setClicked(item);
              setModal(true);
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab label="Groups">
          <Autocomplete
            placeholder="Search Groups"
            itemComponent={AutoCompleteItem}
            data={data}
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
            className="autocomplete"
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue("name", event);
            }}
            limit={15}
            radius="xl"
            size="xs"
            styles={{
              input: { width: "350px" },
            }}
            onItemSubmit={(item) => router.push(`/group?id=${item.groupId}`)}
          />
        </Tabs.Tab>
        <Tabs.Tab label="Events">
          <Autocomplete
            placeholder="Search Events"
            itemComponent={AutoCompleteItem}
            data={data}
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
            className="autocomplete"
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue("name", event);
            }}
            limit={15}
            radius="xl"
            size="xs"
            styles={{
              input: { width: "350px" },
            }}
            onItemSubmit={(item) => router.push(`/group?id=${item.groupId}`)}
          />
        </Tabs.Tab>
        <Modal opened={modal} onClose={() => setModal(false)} size="xl">
          {modal && <UserModal userId={userId} clicked={clicked} />}
        </Modal>
      </Tabs>
    </div>
  );
}
