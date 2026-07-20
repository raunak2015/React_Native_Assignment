import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapComponent({ region, style }) {
  return (
    <MapView style={style} region={region}>
      <Marker coordinate={region} />
    </MapView>
  );
}
