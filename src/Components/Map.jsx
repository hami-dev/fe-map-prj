import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Marker from './Marker';
import CannotMove from './CannotMove';
import { handleDragEnd, handleOnDrag } from 'Utils/handleDrag';
import { getDataFromLS, setDataToLS, deleteDataFromLS } from 'Utils/handleLS';

function Map() {
  // img의 top, left
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  // drag를 시작한 마우스의 좌표
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  // 지도 image
  const mapImage = useRef();

  // 이동 불가 상태
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [moveTop, setMoveTop] = useState(false);
  const [moveBottom, setMoveBottom] = useState(false);

  // 마커
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markerFromLS = getDataFromLS() || [];
    setMarkers(markerFromLS);
  }, []);

  const dAct = {
    setPosX,
    setPosY,
    setMoveLeft,
    setMoveRight,
    setMoveTop,
    setMoveBottom,
  };

  const onDragStart = (e) => {
    setOriginX(e.clientX);
    setOriginY(e.clientY);
  };

  const onDrag = (e) => {
    const dInfo = {
      chaX: e.clientX !== 0 && e.clientX - originX,
      chaY: e.clientY !== 0 && e.clientY - originY,
      nx: posX + e.clientX - originX,
      ny: posY + e.clientY - originY,
      rightLimit: (mapImage.current.width - 1024) * -1,
      bottomLimit: (mapImage.current.height - 768) * -1,
    };

    handleOnDrag({ dInfo, dAct });
  };

  const onDragEnd = (e) => {
    const dInfo = {
      chaX: e.clientX - originX,
      chaY: e.clientY - originY,
      nx: posX + e.clientX - originX,
      ny: posY + e.clientY - originY,
      rightLimit: (mapImage.current.width - 1024) * -1,
      bottomLimit: (mapImage.current.height - 768) * -1,
    };

    handleDragEnd({ dInfo, dAct });
  };

  // 우클릭 시
  const onContextMenu = (e) => {
    e.preventDefault();
    const tempX = e.clientX;
    const tempY = e.clientY;
    const tempMark = [markers.length + 1, tempX - posX, tempY - posY]; // marker 번호, X, Y
    setMarkers((prev) => [...prev, tempMark]);
    setDataToLS([...markers, tempMark]);
  };

  const handleReset = () => {
    setMarkers([]);
    deleteDataFromLS();
  };

  return (
    <>
      <MapWrapper left={moveLeft}>
        <MapImage
          posX={posX}
          posY={posY}
          draggable
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onContextMenu={onContextMenu}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/map.png'}
            alt="map"
            ref={mapImage}
          />
          <Markers posX={posX} posY={posY}>
            {markers &&
              markers.map((item) => (
                <Marker
                  key={item[0]}
                  markerX={item[1] - 75}
                  markerY={item[2] - 160}
                />
              ))}
          </Markers>
        </MapImage>
        <MapCounter
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          📌I have {markers.length} markers
        </MapCounter>
        <ResetButton onClick={handleReset}>
          <img
            src={process.env.PUBLIC_URL + '/images/reset.png'}
            alt="reset btn"
          />
        </ResetButton>
        <CannotMove
          moveLeft={moveLeft}
          moveRight={moveRight}
          moveTop={moveTop}
          moveBottom={moveBottom}
        />
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
  margin: 3rem 3rem;

  :hover {
    cursor: grab;
  }
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
