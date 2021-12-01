import { React, useState, useEffect ,useRef} from 'react';
import ReactMapGL, { Marker , Layer} from 'react-map-gl';
import Dir from './costumDirect';
import 'mapbox-gl/dist/mapbox-gl.css'

import close from '../../img/close.png'
import marker from '../../img/marker.png'
import maponloc from '../../img/onloc.svg'
import { Wrapper, Bg, Card } from './Map.styled';

const Map = ({toggle , far}) => {
    const [viewport, setViewport] = useState({})
    console.log(far)
    const start = [110.37100225029263, -7.7931344997599465]
    const end = [110.35160451469888, -7.755886216995117]
    useEffect(() => {
        setTimeout(() => {
            setViewport({
                latitude: -7.7931344997599465,
                longitude: 110.37100225029263,
                width: '100%',
                height: '100%',
                zoom:11
            })
        }, 2000)
    }, [])
  const [routeLayer, setRouteLayer] = useState({})
 
  
  async function getRoute(end) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        setRouteLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: geojson
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          })
  }
  
    
    let [loc, setLoc] = useState(false)
    let [startLayer, setStartLayer] = useState({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
    })
    const [endLayer, setEndLayer] = useState({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: end
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
        }
    })
    
    const [val, setVal] = useState(false)
    const mapRef = useRef()
    const doit = () => {
        setVal(false)
        setTimeout(() =>{toggle()},100)
    }
    return (
        <Bg>
            <link
  href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css"
  rel="stylesheet"
/>
        <Wrapper>
            <img className="x" onClick={doit} src={close}/>
                <ReactMapGL 
                    onClick={(e) => {
                        const [long, lat] = e.lngLat
                        setLoc([long, lat])
                        console.log(e)
                        getRoute(end)
                    }}
                ref={mapRef}
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/expitc/ckw66dojb2fye14lcysxs3mcb"
                    // mapbox://styles/mapbox/streets-v11
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
                >
                    <Dir mapRef={mapRef} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
                    <Layer {...startLayer} />
                    <Layer {...endLayer}/>
                    <Layer {...routeLayer}/>
                    {loc ? 
                    <>
                    <Marker
                        latitude={loc[1]}
                        longitude={loc[0]}
                        offsetTop={(-viewport.zoom * 3) / 2}
                    >
                        <img src={marker}
                            width={viewport.zoom * 2}
                            height={viewport.zoom * 2}
                        alt="marker"/>
                    </Marker>
                    </>    
                    : null}
                </ReactMapGL>
                {loc ?  
                <>
                <Card>
                    <h3>Select delivery location</h3>
                    <div>
                        <div className="adasdasfaw">
                        <img src={maponloc} alt='onloc'/>
                        <div>
                            <h5>Harbour Building</h5>
                            <p>Jl. Elang IV No.48, Sawah Lama, Kec. Ciputat, Kota
    Tangerang Selatan, Banten 15413, Indonesia</p>
                        </div>
                        </div>
                    </div>
                    <button onClick={doit}>Confirm location</button>
                    </Card>
                    </>
                    : null}
                {far?             <Card h>
                    <h3>Select delivery location</h3>
                    <div>
                        <div className="adasdasfaw">
                        <img src={maponloc} alt='onloc'/>
                        <div>
                            <h5>Harbour Building</h5>
                            <p>Jl. Elang IV No.48, Sawah Lama, Kec. Ciputat, Kota
    Tangerang Selatan, Banten 15413, Indonesia</p>
                        </div>
                        </div>
                    </div>
                    <h3 h>Delivery Time</h3>
                    <p>10 - 15 Minutes</p>
                    <button>Confirm location</button>
                    </Card> : null}
        </Wrapper>
        </Bg>
    )
};

export default Map;