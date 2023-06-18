import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  OutlinedInput,
  Button,
  List,
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
    // Search

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
    // Reset listPlace and error message
    setListPlace([]);
    setSelectPosition(null);
    toast.dismiss(); // Clear any existing error toasts

    // Perform the search only if the searchText is not empty
    if (searchText.trim() !== "") {
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.length === 0) {
            toast.error("No results found.");
            setListPlace([]);
          } else {
            setListPlace(result.slice(0, 3)); // Limiting the results to 3
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          toast.error("An error occurred while fetching results.");
          setListPlace([]);
        });
    } else {
      toast.error("Please enter something.");
    }
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
              // SearchResult();
            }}
            //  onClick={SearchResult}
          />

          <Button variant="contained" color="primary" onClick={SearchResult}>
            Search
          </Button>
        </div>
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
      <ToastContainer />
    </div>
  );
}
