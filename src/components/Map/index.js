import { React, useState, useEffect, useContext, useMemo } from "react";
import ReactMapGL, { Marker, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserContext } from "../../Context/userContext";
import { handleError } from "../../config/api";

import close from "../../img/close.png";
import maponloc from "../../img/onloc.svg";
import { Wrapper, Bg, Card } from "./Map.styled";
import socketIo from "../../utils/socket";
import toMinutes from "../../utils/toMinutes";
import axios from "axios";

const Map = ({
  toggle,
  far,
  setLocEdit,
  updateLoc,
  startLoc,
  cart,
  transId,
}) => {
  const [viewState, setViewState] = useState(false);
  const { state } = useContext(UserContext);
  const { user } = state;
  const socket = socketIo(user?.id);
  const yogyaLatLong = [-7.780888853879075, 110.38593679008736];

  const end = useMemo(() => {
    if (!user?.location) return yogyaLatLong;

    const endPoint = user.location.split(" ");
    return [parseFloat(endPoint[1]), parseFloat(endPoint[0])];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.location]);

  const start = useMemo(() => {
    if (startLoc?.length > 0)
      return [parseFloat(startLoc[1]), parseFloat(startLoc[0])];
    //
    if (!user?.location) return yogyaLatLong;

    const starPoint = user.location.split(" ");
    return [parseFloat(starPoint[1]), parseFloat(starPoint[0])];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLoc, user?.location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setViewState({
        latitude: -7.780888853879075,
        longitude: 110.38593679008736,
        width: "100%",
        height: "100%",
        zoom: 11,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const [address, setAddress] = useState();

  const [loc, setLoc] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      if (!far) return;
      try {
        await axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${end[1]}&lon=${end[0]}`,
            { signal }
          )
          .then((res) => {
            setAddress(res?.data);
          });
      } catch (err) {
        console.error(err);
      }
    })();
    return () => controller.abort();
  }, [end, far, loc]);

  async function getAddress(lat, lon) {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      )
      .then((res) => {
        setAddress(res?.data);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  const nameAddress = useMemo(() => {
    if (address?.display_name) {
      return address.display_name.split(",");
    }
    return [];
  }, [address]);

  const [duration, setDuration] = useState(0);
  const [routeLayer, setRouteLayer] = useState(false);

  useEffect(() => {
    if (!far) return;
    const controller = new AbortController();
    const signal = controller.signal;
    // Get route with end
    (async () => {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      try {
        // const direction_api = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
        const direction_api2 = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]}%2C${start[1]}%3B${end[0]}%2C${end[1]}?alternatives=false&exclude=toll%2Cferry%2Cunpaved%2Ccash_only_tolls&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

        const response = await fetch(direction_api2, { signal });
        let data = await response.json();
        data = data.routes[0];

        setDuration(data?.duration || 0);
        const route = data.geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        setRouteLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      } catch (err) {
        handleError(err);
      }
    })();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, start]);

  const startLayer = useMemo(
    () => ({
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: start,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    }),
    [start]
  );

  const endLayer = useMemo(
    () => ({
      id: "end",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: end,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#f30",
      },
    }),
    [end]
  );

  const [otwOrder, setOtwOrder] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    socket.on("connect", () => {
      console.info(socket.connected);
    });

    socket.emit("onTheWay", user.id);
    socket.on("otwData", (data) => {
      setOtwOrder(data);
    });

    if (transId) {
      socket.emit("subTrans", transId);
      socket.on("confirmTransaction", () => {
        socket.emit("onTheWay", user.id);
        socket.on("otwData", (data) => {
          setOtwOrder(data);
        });
      });
    }

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
    return () => {
      if (transId) socket.emit("unsubTrans", transId);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, transId]);

  return (
    <Bg>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css"
        rel="stylesheet"
      />
      <Wrapper>
        {far ? (
          <>
            {startLayer && endLayer && routeLayer && viewState !== false && (
              <ReactMapGL
                {...viewState}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onMove={(evt) => setViewState(evt.viewState)}
              >
                <Source generateId type="geojson" data={startLayer.source.data}>
                  <Layer {...startLayer} />
                </Source>
                <Source generateId type="geojson" data={endLayer.source.data}>
                  <Layer {...endLayer} />
                </Source>
                <Source generateId type="geojson" data={routeLayer.source.data}>
                  <Layer {...routeLayer} />
                </Source>

                <Marker
                  latitude={start[1]}
                  longitude={start[0]}
                  offsetTop={(-viewState.zoom * 5) / 2}
                  offsetLeft={(-viewState.zoom * 4) / 2}
                >
                  <img
                    src={maponloc}
                    width={viewState.zoom * -1}
                    height={viewState.zoom * 4}
                    alt="marker"
                  />
                </Marker>
              </ReactMapGL>
            )}
          </>
        ) : (
          <>
            {viewState !== false && (
              <>
                <img
                  className="x"
                  onClick={toggle}
                  src={close}
                  alt="close button"
                />
                <ReactMapGL
                  onClick={async (e) => {
                    const { lng, lat } = e.lngLat;
                    setLocEdit([lat, lng]);
                    setLoc([lng, lat]);
                    setAddress(null);
                    await getAddress(lat, lng);
                  }}
                  {...viewState}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  mapStyle="mapbox://styles/expitc/ckw66dojb2fye14lcysxs3mcb"
                  // mapbox://styles/mapbox/streets-v11
                  onMove={(evt) => setViewState(evt.viewState)}
                >
                  {loc && (
                    <Marker
                      latitude={loc[1]}
                      longitude={loc[0]}
                      offsetTop={(-viewState.zoom * 5) / 2}
                      offsetLeft={(-viewState.zoom * 4) / 2}
                    >
                      <img
                        src={maponloc}
                        width={viewState.zoom * -1}
                        height={viewState.zoom * 4}
                        alt="marker"
                      />
                    </Marker>
                  )}
                </ReactMapGL>
              </>
            )}
          </>
        )}
        {loc && (
          <Card>
            {address?.display_name && <h3>Delivery location</h3>}
            <div>
              <div className="address">
                <img src={maponloc} alt="onloc" />
                <div>
                  {!address?.display_name && <h3>Load location...</h3>}
                  <h5>{nameAddress ? nameAddress[0] : "not found"}</h5>
                  <p>{address?.display_name}</p>
                </div>
              </div>
            </div>
            {address?.display_name && (
              <>
                {cart ? (
                  <>
                    {!otwOrder && (
                      <button
                        onClick={() => {
                          toggle();
                          updateLoc();
                        }}
                      >
                        Confirm update location
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      toggle();
                    }}
                  >
                    Confirm location
                  </button>
                )}
              </>
            )}
          </Card>
        )}
        {far && (
          <Card h={true}>
            <h3>
              {otwOrder
                ? "Driver is On The Way"
                : "Waiting for the transaction to be approved"}
            </h3>
            <div>
              <div className="address">
                <img src={maponloc} alt="onloc" />
                <div>
                  <h5>
                    {nameAddress.length > 0 ? nameAddress[0] : "not found"}
                  </h5>
                  <p>{address?.display_name}</p>
                </div>
              </div>
            </div>
            <h3 h>Delivery Time</h3>
            <p>{toMinutes(duration)} Minutes</p>
            {otwOrder ? (
              <button onClick={toggle}>Finished Order</button>
            ) : (
              <button disabled>Waiting Approve</button>
            )}
          </Card>
        )}
      </Wrapper>
    </Bg>
  );
};

export default Map;
