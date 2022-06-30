import AddComment from "./AddComment";
import CommentFeed from "./CommentFeed";
import UserModal from "./Friends/UserModal";
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
  Modal,
} from "@mantine/core";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
  const [modal, setModal] = useState(false);

  function getComments() {
    axios
      .get(`/api/event/comment?id=${event_id}`)
      .then((data) => setComments(data.data[0].rows))
      .catch((err) => console.log(err));
  }

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
      <Group
        key={index}
        position="apart"
        className="border-b-2 pb-1 pt-50 mb-3"
      >
        <Group>
          <Avatar
            src={attendee.photo}
            radius="xl"
            component="span"
            size={30}
            className="ml-2"
            onClick={() => setModal(true)}
          />
          <Text onClick={() => setModal(true)} className="ml-0">
            {attendee.name}
          </Text>
        </Group>
        <Avatar
          radius="xl"
          size={25}
          className="cursor-pointer shadow mr-2"
          onClick={() => {
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faUserCircle} className="w-[55%] " />
        </Avatar>
        <Modal opened={modal} onClose={() => setModal(false)} size="xl">
          <UserModal userId={user_id} clicked={{ user_id: attendee.user_id }} />
        </Modal>
      </Group>
    );
  });

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
    </div>
  );
}

export default EventDetail;
