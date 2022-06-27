import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import MapContainer from '../components/Map/MapContianer.jsx';

const MapPage = () => {
  return (
    <main className="min-h-screen w-screen p-5 ">
    <Group position="apart" className="h-[90vh] Group">
      <Stack style={{ width: "20%", height: "100%" }}>
        <div className="border h-[100%] shadow">
          <h2>🐶 Nearby events</h2>
        </div>
      </Stack>
      <Stack style={{ flexGrow: "1", height: "100%" }}>
        <div className="border h-[100%] shadow">
          <h2>🐶 Map</h2>
          <MapContainer className="z-50" />
        </div>
      </Stack>
    </Group>
  </main>
  )
};

export default MapPage;
