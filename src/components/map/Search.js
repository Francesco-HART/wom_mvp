import React from "react";
import { withLeaflet } from "react-leaflet";
import { ReactLeafletSearch } from "react-leaflet-search";

const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch);


/**
 * This function will display a component used for maps
 * @return {*}
 * @constructor
 */
export const Search = () => {
  const change = (e) => {console.log(e)};

  return (
    <ReactLeafletSearchComponent
      position="topright"
      inputPlaceholder="Recherche"
      search={[]}
      onChange={change}
      zoom={12}
      showMarker={false}
      showPopup={false}
      openSearchOnLoad={false}
      closeResultsOnClick={true}
      searchBounds={[]}
    />
  );
};
