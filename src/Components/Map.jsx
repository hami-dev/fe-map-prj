import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function Map() {
  // img의 top, left
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  // drag를 시작한 마우스의 좌표
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  // 지도 image
  const mapImage = useRef();

  // 마커
  const [markers, setMarkers] = useState([]);

  const onDragStart = (e) => {
    setOriginX(e.clientX);
    setOriginY(e.clientY);
  };

  const onDragEnd = (e) => {
    const tempX = e.clientX;
    const tempY = e.clientY;
    const chaX = tempX - originX;
    const chaY = tempY - originY;
    if (posX + chaX > 0) {
      setPosX(0);
      return;
    }
    if (posX + chaX < (mapImage.current.width - 1024) * -1) {
      setPosX((mapImage.current.width - 1024) * -1);
      return;
    }
    if (posY + chaY > 0) {
      setPosY(0);
      return;
    }
    if (posY + chaY < (mapImage.current.height - 768) * -1) {
      setPosY((mapImage.current.height - 768) * -1);
      return;
    }
    setPosX(posX + chaX);
    setPosY(posY + chaY);
  };

  // 우클릭 시
  const onContextMenu = (e) => {
    e.preventDefault();
    const tempX = e.clientX;
    const tempY = e.clientY;
    const tempMark = [markers.length + 1, tempX - posX, tempY - posY]; // marker 번호, X, Y
    setMarkers((prev) => [...prev, tempMark]);
  };

  const handleReset = () => {
    setMarkers([]);
  };

  return (
    <>
      <MapWrapper>
        <MapImage
          posX={posX}
          posY={posY}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onContextMenu={onContextMenu}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/map.png'}
            ref={mapImage}
          />
          <Markers posX={posX} posY={posY}>
            {markers &&
              markers.map((item) => (
                <Marker
                  key={item[0]}
                  markerX={item[1] - 44}
                  markerY={item[2] - 130}
                >
                  <img src={process.env.PUBLIC_URL + '/images/marker.png'} />
                </Marker>
              ))}
          </Markers>
        </MapImage>
        <MapCounter>📌I have {markers.length} markers</MapCounter>
        <ResetButton onClick={handleReset}>
          <img src={process.env.PUBLIC_URL + '/images/reset.png'} />
        </ResetButton>
      </MapWrapper>
    </>
  );
}

const MapWrapper = styled.div`
  position: relative;
  width: 1024px;
  height: 768px;
  border: 1px solid #d0b6b6;
  overflow: hidden;
`;

const MapImage = styled.div`
  position: relative;
  width: 2907px;
  height: 3460px;
  top: ${(props) => props.posY + 'px'};
  left: ${(props) => props.posX + 'px'};
`;

const Markers = styled.ul`
  position: absolute;
  width: 2907px;
  height: 3460px;
  top: 0px;
`;

const Marker = styled.li`
  position: absolute;
  top: ${(props) => props.markerY + 'px'};
  left: ${(props) => props.markerX + 'px'};
`;

const MapCounter = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 2.5rem;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;

  :hover {
    opacity: 0.8;
  }
`;

export default Map;
