// src/react-leaflet.d.ts
import { LatLngExpression } from "leaflet";
import "react-leaflet";

// Augment react-leaflet’s MapContainerProps to include center, zoom, and scrollWheelZoom
declare module "react-leaflet" {
  interface MapContainerProps {
    /** Initial geographic center of the map */
    center: LatLngExpression;
    /** Initial zoom level */
    zoom: number;
    /** Enable or disable scroll-wheel zoom */
    scrollWheelZoom?: boolean;
  }
}
