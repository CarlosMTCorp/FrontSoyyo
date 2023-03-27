import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";

const MapGoogle = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBrIFXIi_9qo1vFzx3Z4fPPKLX1SOA0C-4&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ isMarkerShown, mapCenter }) => {
  const [center, setCenter] = useState(mapCenter);

  useEffect(() => {
    setCenter(mapCenter);
  }, [mapCenter]);

  function handleClick(event) {
    let latitude = event.latLng.lat();
    let longitude = event.latLng.lng();
    mapCenter.lat = latitude;
    mapCenter.lng = longitude;
    let location = { lat: latitude, lng: longitude };
    setCenter(location);
  }
  return (
    <div>
      <GoogleMap
        onClick={(e) => handleClick(e)}
        defaultZoom={15}
        defaultCenter={{ lat: center.lat, lng: center.lng }}
        center={{ lat: center.lat, lng: center.lng }}
      >
        {isMarkerShown && (
          <Marker position={{ lat: center.lat, lng: center.lng }} />
        )}
      </GoogleMap>
    </div>
  );
});

const MapSoyYo = ({ handleOnHide }) => {
  const token = useSelector((state) => state.login.token);
  const [loadingActive, setLoadingActive] = useState(false);
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getMap();
  }, []);

  const getMap = async () => {
    setLoadingActive(true);
    const response = await fetch(DOMAIN + "profile/map", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        let userMap = {
          lat: +response.data.latitude,
          lng: +response.data.longitude,
        };
        setMapCenter(userMap);
      }
      setLoadingActive(false);
    });
  };

  const updateMap = async () => {
    setLoadingActive(true);
    const response = await fetch(DOMAIN + "profile/map", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        latitude: mapCenter.lat.toString(),
        longitude: mapCenter.lng.toString(),
        is_visible: true,
      }),
    });
    await response.json().then((data) => {
      setLoadingActive(false);
      handleOnHide();
    });
  };
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setAddress(address);
        setMapCenter(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={style.buscador_item}>
            <input
              {...getInputProps({
                placeholder: "Busca un lugar ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Cargando...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#d6d6d6", cursor: "pointer" }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                    };
                return (
                  <div
                    className={style.contenedor_buscador}
                    key={index + "-" + suggestion.description}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span key={suggestion.description}>
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {loadingActive ? (
        <Loading />
      ) : (
        <MapGoogle isMarkerShown={true} mapCenter={mapCenter}></MapGoogle>
      )}

      <div className={style.button_email}>
        <button
          className={style.btn_primary}
          onClick={() => {
            updateMap();
          }}
        >
          Guardar datos
        </button>
      </div>
    </div>
  );
};

export default MapSoyYo;
