import { React, useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import close from '../../img/Trash.svg'
import { Wrapper } from './Map.styled';

const Map = ({toggle}) => {
    const [viewport, setViewport] = useState({
        latitude: -7.7931344997599465,
        longitude: 110.37924199638634,
        width: '100%',
        height: '100%',
        zoom:12
    })
    return (
        <Wrapper>
            <img onClick={toggle} src={close}/>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                
            </ReactMapGL>
        </Wrapper>
    )
};

export default Map;