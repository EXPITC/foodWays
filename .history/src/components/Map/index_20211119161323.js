import { React, useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import close from '../../img/Trash.svg'
import { Wrapper } from './Map.styled';

const Map = ({toggle}) => {
    const [viewport, setViewport] = useState({
        latitude: -7.9778384,
        longitude: 110.3672257,
        width: '100%',
        height: '100%',
        zoom:10
    })
    return (
        <Wrapper>
            <img onClick={toggle} src={close}/>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewStateChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                
            </ReactMapGL>
        </Wrapper>
    )
};

export default Map;