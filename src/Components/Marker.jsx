import React from 'react';
import styled from 'styled-components';

function Marker({ markerX, markerY }) {
  return (
    <Markerdiv markerX={markerX} markerY={markerY}>
      <img src={process.env.PUBLIC_URL + '/images/marker.png'} />
    </Markerdiv>
  );
}

const Markerdiv = styled.li`
  position: absolute;
  top: ${(props) => props.markerY + 'px'};
  left: ${(props) => props.markerX + 'px'};
`;

export default Marker;
