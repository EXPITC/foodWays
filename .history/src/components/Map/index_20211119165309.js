import { React, useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import close from '../../img/Trash.svg'
import marker from '../../img/marker.png'
import { Wrapper } from './Map.styled';

const Map = ({toggle}) => {
    const [viewport, setViewport] = useState({
        latitude: -7.7931344997599465,
        longitude: 110.37100225029263,
        width: '100%',
        height: '100%',
        zoom:11
    })
    return (
        <Wrapper>
            <img className="x"onClick={toggle} src={close}/>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle = "mapbox://styles/expitc/ckw66dojb2fye14lcysxs3mcb"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                <marker
                    latitude={-7.764025552237254}
                    longitude={110.40305394530179}
                    offsetTop={(-viewport.zoom * 5)/2}
                >
                    <img src={marker}
                    width={viewport.zoom * 5}
                    height={viewport.zoom *5}
                    />
                </marker>
            </ReactMapGL>
        </Wrapper>
    )
};

export default Map;