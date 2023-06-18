import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  OutlinedInput,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const SearchResult = async () => {
    // SearchComment
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("from nomimatim", JSON.parse(result));

        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        //  justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "50%", margin: "10px" }}
            placeholder="Search Country..."
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              SearchResult();
            }}
            onClick={SearchResult}
          />
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 20px",
          }}
        >
          <Button variant="contained" color="primary" onClick={SearchResult}>
            Search
          </Button>
        </div> */}
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItemButton
                  onClick={() => {
                    setSelectPosition(item);
                    // console.log(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./marker.png"
                      alt="marker"
                      style={{ width: 18, height: 18 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItemButton>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
