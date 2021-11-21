import { React, useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import close from '../../img/Trash.svg'
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
            <img onClick={toggle} src={close}/>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle = "mapbox://styles/expitc/ckw66dojb2fye14lcysxs3mcb"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                <marker ></marker>
            </ReactMapGL>
        </Wrapper>
    )
};

export default Map;