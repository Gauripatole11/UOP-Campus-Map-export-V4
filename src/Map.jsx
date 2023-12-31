import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet

const zoom = 13;
const regionCoord = [37.9799, -121.3129];
const additionalMarkerCoord = [37.9817, -121.312];

// Create custom icons for different categories
const icons = {
  Makerspace: L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  }),
  "Study Rooms": L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
      "https://www.pngall.com/wp-content/uploads/12/Red-Star-Shape-PNG-File.png"
  }),
  LABS: L.icon({
    iconSize: [30, 30], // Adjust the size as needed
    iconAnchor: [15, 15], // Adjust the anchor point as needed
    popupAnchor: [0, -15], // Adjust the popup anchor as needed
    iconUrl:
      "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7810468/map-marker-pin-clipart-md.png"
  })
};

const markers = [
  {
    position: regionCoord,
    category: "Makerspace",
    name: "Makerspace",
    hours: "9 AM - 5 PM",
    phone: "123-456-7890",
    image:
      "https://www.pacific.edu/sites/default/files/styles/mobile_header_image/public/2020-12/RS17136_Campus%20Beauty%20WebRedesign15-lpr.jpg?itok=YchCm9Bs"
  },
  {
    position: additionalMarkerCoord,
    category: "Study Rooms",
    name: "Study Room 1",
    hours: "7 AM - 11 PM",
    phone: "987-654-3210",
    image: "https://ffpubliclibrary.prod.govaccess.org/home/showimage?id=1742" // Add the URL of the first image here
  },
  {
    position: [37.9789, -121.3111],
    category: "Study Rooms",
    name: "Study Room 2",
    hours: "7 AM - 12AM",
    phone: "555-555-5555",
    image:
      "https://www.officeevolution.com/wp-content/uploads/2022/05/AZ-Phoenix-2-1.jpg"
  },
  {
    position: [37.979751, -121.309154],
    category: "Study Rooms",
    name: "Study Room 3",
    hours: "7 AM - 8 PM",
    phone: "444-444-4444",
    image: "https://ffpubliclibrary.prod.govaccess.org/home/showimage?id=1742" // Add the URL of the third image here
  },
  {
    position: [37.9789, -121.3111],
    category: "LABS",
    name: "Lab Location 1",
    hours: "7 AM - 8 PM",
    phone: "123-456-7890",
    image:
      "https://www.pacific.edu/sites/default/files/users/user245/Pacific_Zoom_backgrounds-11.jpg" // Add the URL of the image here
  },
  {
    position: [37.980156, -121.310679],
    category: "LABS",
    name: "Lab Location 2",
    hours: "8 AM - 9 PM",
    phone: "987-654-3210",
    image:
      "https://pacificpredentalclub.weebly.com/uploads/5/1/8/5/5185698/2306319.jpg?323"
  },
  // Add more "Labs" markers with images as needed

  {
    position: [37.980155, -121.311378],
    category: "LABS",
    name: "Lab Location 3",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image:
      "https://www.visitstockton.org/imager/files_idss_com/C102/10d3cebd-d368-42b9-ab29-a723bf845512_2d2caff0c681c4a1088a322eee091b5a.jpg"
  },
  {
    position: [37.976279, -121.31183],
    category: "LABS",
    name: "Lab Location 3",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image:
      "https://dental.pacific.edu/sites/default/files/styles/two_column_header_image_desktop/public/2020-09/1191347691818006.JB5XjSm4heiOoRmWE40M_height640.png?itok=c2wnrxYh"
  },
  {
    position: [37.976586, -121.314124],
    category: "LABS",
    name: "Lab Location 3",
    hours: "8 AM - 5 PM",
    phone: "987-654-3210",
    image: "https://assets.obj.ca/2023/09/Algonquin-cybersecurity-lab.jpg"
  }
];

function Map() {
  const [map, setMap] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function FlyToButton() {
    const onClick = () => {
      map.flyTo(regionCoord, zoom);
    };

    return <Button onClick={onClick}>Add marker on click</Button>;
  }

  // Filter markers based on the selected category
  const filteredMarkers = selectedCategory
    ? markers.filter((marker) => marker.category === selectedCategory)
    : markers;

  const sidebarStyles = {
    background: "#f0f0f0",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px"
  };

  // Custom CSS styles for buttons
  const buttonStyles = {
    marginBottom: "10px",
    width: "100%",
    textAlign: "left"
  };

  const makerspaceButtonStyles = {
    ...buttonStyles,
    background: "blue", // Add your desired background color
    color: "white"
  };

  const studyRoomsButtonStyles = {
    ...buttonStyles,
    background: "green", // Add your desired background color
    color: "white"
  };

  const labsButtonStyles = {
    ...buttonStyles,
    background: "orange", // Add your desired background color
    color: "white"
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        {/* Sidebar with category buttons */}
        <div style={sidebarStyles}>
          <h2>Categories</h2>
          <Button
            style={makerspaceButtonStyles}
            onClick={() => setSelectedCategory("Makerspace")}
          >
            Makerspace
          </Button>
          <Button
            style={studyRoomsButtonStyles}
            onClick={() => setSelectedCategory("Study Rooms")}
          >
            Study Rooms
          </Button>
          <Button
            style={labsButtonStyles}
            onClick={() => setSelectedCategory("LABS")}
          >
            LABS
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          <FlyToButton />{" "}
          {/* Move the FlyToButton component inside the Grid item */}
        </div>
      </Grid>
      <Grid item xs={10}>
        <MapContainer
          center={regionCoord}
          zoom={zoom}
          style={{ height: "90vh" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Display filtered markers */}

          {filteredMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={icons[marker.category]} // Use the appropriate icon based on the category
            >
              {/* Customize the Popup content */}
              <Popup>
                <div>
                  <h3>{marker.name}</h3>
                  <p>Category: {marker.category}</p>
                  <p>Hours: {marker.hours}</p>
                  <p>Phone: {marker.phone}</p>
                  {marker.image && (
                    <img
                      src={marker.image}
                      alt="Marker Image"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Grid>
      <FlyToButton />
    </Grid>
  );
}

export default Map;
