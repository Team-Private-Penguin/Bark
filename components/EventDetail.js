import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Switch,
  Stack,
  Group,
  Avatar,
  Badge,
  Title,
  Button,
  ScrollArea,
} from "@mantine/core";
import axios from "axios";

function EventDetail({
  image,
  event,
  rsvp,
  handleRsvp,
  user_id,
  handleDeleteEvent,
  handleEdit,
  canEdit,
}) {
  const {
    name,
    address,
    date,
    prospective,
    description,
    group_name,
    event_id,
  } = event;
  const timeStamp = new Date(date);
  const [comments, setComments] = useState([{}]);
  const [attendees, setAttendees] = useState([{}]);
  const [openEdit, setOpenEdit] = useState(false);
  function getComments() {
    axios
      .get(`/api/event/comment?id=${event_id}`)
      .then((data) => setComments(data.data[0].rows))
      .catch((err) => console.log(err));
  }

  const editForm = useForm({
    name: "",
    address: "",
    date: "",
    prospective: "",
    description: "",
    group_name: "",
    event_id: "",
  });

  useEffect(() => {
    if (event_id) {
      getComments();
    }
  }, [user_id]);

  useEffect(() => {
    if (event_id) {
      axios
        .get(`/api/event/rsvp?event_id=${event_id}`)
        .then((data) => setAttendees(data.data[0].rows))
        .catch((err) => console.log(err));
    }
  }, [rsvp, user_id]);

  const attendeeList = attendees.map((attendee, index) => {
    return (
      <Group key={index} className="border-b-2 pb-1 pt-50 mb-3">
        <Avatar
          src={attendee.photo}
          radius="xl"
          component="span"
          size={30}
          className="ml-5"
        />
        <Text className="ml-1">{attendee.name}</Text>
      </Group>
    );
  });

  // const editEvent = (values) => {
  //   values["admin_id"] = user_id;
  //   axios.patch("/api/event", values)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err)=> {
  //       console.log(err);
  //     })
  //   setOpenEdit(false);
  // }
  const placeholder = "PLACEHOLDER";
  return (
    <div className="flex w-full h-full items-top justify-center space-x-2">
      <Card
        className="sticky top-0 space-y-2 w-[74%]"
        radius="10px"
        shadow="sm"
      >
        <Card.Section className="bg-main p-2">
          <Group position="apart">
            <Title order={3}>{name}</Title>
            <Title order={5}>
              {timeStamp.toLocaleString([], {
                dateStyle: "short",
              })}
            </Title>
          </Group>
        </Card.Section>
        <Stack>
          {canEdit ? (
            <Group grow spacing={0}>
              <Button onClick={handleEdit} variant="default">
                EDIT
              </Button>
              <Button onClick={handleDeleteEvent} variant="default">
                DELETE
              </Button>
            </Group>
          ) : null}
          {prospective ? <Badge color="grape">PLANNING EVENT</Badge> : null}
        </Stack>
        <Card.Section className="h-[25vh] flex items-center justify-center space-x-4">
          <Stack>
            <img
              className="rounded-[10px] max-h-[25vh] max-w-[27vw]"
              src={image}
            />
          </Stack>
        </Card.Section>

        <Card.Section p=".5rem">
          <Group position="apart">
            <Badge className="">{group_name}</Badge>
            <Switch
              checked={rsvp}
              onChange={handleRsvp}
              label={prospective ? "Interested?" : "RSVP"}
            ></Switch>
          </Group>
          <Title order={5} color="var(--black)" size="lg">
            {address}
          </Title>
          <Text color="var(--black)" size="md">
            {description}
          </Text>
        </Card.Section>
        <Card.Section>
          <AddComment
            user_id={user_id}
            event={event}
            setComments={setComments}
          />
        </Card.Section>
        <Card.Section
          className={`p-2 ${
            prospective ? "h-[25vh]" : "h-[29vh]"
          } overflow-auto`}
        >
          <CommentFeed
            comments={comments}
            isOwner={canEdit}
            getComments={getComments}
          />
        </Card.Section>
      </Card>
      <Card className="space-y-1 w-[24%] h-[90vh]" radius="10px" shadow="sm">
        <Card.Section className="bg-main p-2">
          <Title align="center" order={4}>
            {prospective ? "Interested" : "RSVPs"}
          </Title>
        </Card.Section>
        <ScrollArea className="h-[98%] overflow-auto">
          {attendeeList}
        </ScrollArea>
      </Card>

      {placeholder /* <Modal
        opened={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit"
      >
        <form onSubmit={form.onSubmit((values) => editEvent(values))}>
          <TextInput
            placeholder="Event Name"
            label="Event name"
            required
            {...editForm.getInputProps("name")}
          />
          <TextInput
            placeholder="Address Line 1"
            label="Address"
            required
            {...editForm.getInputProps("address_1")}
          />
          <TextInput
            placeholder="description"
            label="Description"
            required
            {...editForm.getInputProps("description")}
          />
          <DatePicker
            placeholder="Pick date"
            label="Event date"
            required
            {...editForm.getInputProps("date")}
          />
          <DatePicker
            placeholder="event id"
            label="Event id"
            required
            {...editForm.getInputProps("event_id")}
          />
          <DatePicker
            placeholder="group id"
            label="group id"
            required
            {...editForm.getInputProps("group_id")}
          />

          <Group position="right" mt="md">
            <Button className="bg-slate-800" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal> */}

    </div>
  );
}

export default EventDetail;
