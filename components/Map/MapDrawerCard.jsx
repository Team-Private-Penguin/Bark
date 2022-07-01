import React, { useState, useContext, useEffect } from "react";
import { MapContainerState } from "./MapContainer.jsx";
import {
  Modal,
  Card,
  Text,
  Image,
  Space,
  Collapse,
  Button,
  CardSection,
  Dialog,
  Switch,
} from "@mantine/core";
import { createDecipheriv } from "crypto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

export default function MapDrawerCard(props) {
  const { user } = useUser();
  let card = props.card;
  let [textStyle, setTextStyle] = useState({
    marginTop: "2%",
    marginLeft: "5%",
    marginBottom: "2%",
  });
  let [open, setOpen] = useState(false);
  let [updateRsvp, setUpdateRsvp] = useState(false);
  let [updateRsvpList, setUpdateRsvpList] = useState(false);
  let [userEvents, setUserEvents] = useState([]);
  let {
    eventId,
    setEventId,
    zoom,
    setZoom,
    rsvp,
    setRSVP,
    center,
    setCenter,
    setMarkers,
  } = useContext(MapContainerState);

  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }

  // Setting RSVP based on Diologue Switch
  useEffect(() => {
    axios.get(`/api/map/rsvp?id=${userId}`).then((response) => {
      setUserEvents((userEvents = [...response.data]));
    });
  }, [updateRsvpList]);

  let moreInfo = () => {
    setOpen(open === false ? true : false);
    setCenter({ lat: card.lat, lng: card.lng });
    setMarkers([{ lat: card.lat, lng: card.lng }]);
    setZoom((zoom = 16));
  };

  return (
    <>
      <Card
        id={card.event_id}
        className="shadow mapDrawerCard"
        mb="md"
        key={card.event_id}
      >
        <Card.Section>
          <Image
            className="rounded-[10px]"
            src={card.img_url}
            height={150}
            alt="Test"
          />
        </Card.Section>
        <Card.Section>
          <Text size="md" style={textStyle}>
            {card.name}
          </Text>
          <Text size="sm" style={textStyle}>
            {card.date}
          </Text>
        </Card.Section>
        <div
          className="mapCardButtonDiv"
          onClick={() => {
            moreInfo();
          }}
        >
          <FontAwesomeIcon className="mapCardButton" icon={faBars} />
        </div>
      </Card>
      <Dialog
        position={{ left: 360, top: 0 }}
        opened={open}
        withCloseButton={true}
        onClose={() => {
          setOpen(false);
        }}
        size="lg"
      >
        <Card
          id={card.event_id}
          className="shadow mapDrawerCard"
          mb="md"
          key={card.event_id}
        >
          <Card.Section size="xl" style={textStyle}>
            <h1>{card.name}</h1>
          </Card.Section>
          <Card.Section>
            <Image
              className="rounded-[10px]"
              src={card.img_url}
              height={150}
              alt="Test"
            />
          </Card.Section>
          <Card.Section>
            <Text size="sm" style={textStyle}>
              {card.date}
            </Text>
            <Card.Section size="sm" style={textStyle}>
              {card.description}
            </Card.Section>
          </Card.Section>
          <Card.Section size="sm" style={textStyle}>
            Address: {card.address}
          </Card.Section>
        </Card>
      </Dialog>
    </>
  );
}
