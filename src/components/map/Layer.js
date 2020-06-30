import React from "react";
import { TileLayer, LayersControl } from "react-leaflet";
import layers from "../../constants/map/layers"
const { BaseLayer } = LayersControl;


/**
 * This function is used to handle all map's layer
 * @return {*}
 * @constructor
 */
export const Layer = () => {
  return (
    <LayersControl position="bottomleft">
      {layers.map((layer, index) => (
        <BaseLayer key={layer.name} checked={index === 0} name={layer.name}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={layer.url}
            noWrap={true}
            bounds={[
              [-90, -180],
              [90, 180],
            ]}
          />
        </BaseLayer>
      ))}
    </LayersControl>
  );
};
