import React, { useState, useContext, useEffect } from 'react'
import { MapContainerState } from './MapContianer';
import { Modal, Card, Text, Image, Space, Collapse, Button, CardSection, Dialog, Switch } from "@mantine/core";
import { createDecipheriv } from 'crypto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function MapDrawerCard(props) {
  let card = props.card;
  let [textStyle, setTextStyle] = useState({
    marginTop: '2%',
    marginLeft: '5%',
    marginBottom: '2%'
  });
  let [open, setOpen] = useState(false);
  let {rsvp, setRSVP, center, setCenter, setMarkers} = useContext(MapContainerState);

  useEffect(() => {
    if (rsvp === true) {
      card.prospective = true;
    } else {
      card.perspective = false;
    }
  }, [rsvp]);

  return (
    <>
      <Card id={card.event_id} className="shadow mapDrawerCard" mb="md" key={card.event_id}>
        <Card.Section >
          <Image className="rounded-[10px]" src={card.image_url} height={150} alt="Test" />
        </Card.Section>
        <Card.Section>
          <Text size="md" style={textStyle} >
            {card.name}
          </Text>
          <Text size="sm" style={textStyle}>
            {card.date}
          </Text>
        </Card.Section>
        <div className="pointer" onClick={() => {setOpen((open === false) ? true : false); setCenter({ lat: card.lat, lng: card.lng }); setMarkers([{lat: card.lat, lng: card.lng}]); }}>
          <FontAwesomeIcon className="mapCardButton" icon={faBars} />
        </div>
      </Card>
      <Dialog position={{left: 360, top: 0}} opened={open} withCloseButton={true} onClose={() => {setOpen(false);}} size="lg">
        <Card id={card.event_id} className="shadow mapDrawerCard" mb="md" key={card.event_id}>
          <Card.Section size="xl" style={textStyle}>
            <h1>{card.name}</h1>
          </Card.Section>
          <Card.Section >
            <Image className="rounded-[10px]" src={card.image_url} height={150} alt="Test" />
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
          <Card.Section size="sm" style={textStyle}>
            <Switch label="RSVP" checked={rsvp} onChange={(event)=> {setRSVP(event.currentTarget.checked); console.log(rsvp);}}/>
          </Card.Section>
        </Card>
      </Dialog>
    </>
  )
}
