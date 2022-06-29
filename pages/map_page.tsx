import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Navbar from "../components/Navbar";
import MapContainer from '../components/Map/MapContainer.jsx';

const MapPage = () => {
  return (
    <main className="min-h-screen w-screen ">
      <Group position="apart" className="h-[90vh] Group">
        <Navbar />
        <Stack style={{ width: "100%", height: "100%" }}>
          <MapContainer />
        </Stack>
      </Group>
  </main>
  )
};

export default MapPage;