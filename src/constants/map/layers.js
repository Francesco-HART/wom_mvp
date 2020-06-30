const layers = [
    {
        name: "Standard",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
        name: "Noir et blanc",
        url: "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
    },
    {
        name: "OpenStreetMap France",
        url: "http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    },
    /*{
        name: "Humanitarian",
        url: "http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      },
      {
        name: "Kartotherian",
        url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
      },*/
    {
        name: "Topographique",
        url: "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
    },
];

export default layers;
