import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function Map() {
  // img의 top, left
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  // drag를 시작한 마우스의 좌표
  const [originX, setOriginX] = useState(0);
  const [originY, setOriginY] = useState(0);

  // drag 중인지 확인
  const [isDrag, setIsDrag] = useState(false);

  // 지도 image
  const mapImage = useRef();

  useEffect(() => {}, [posX, posY]);

  const onDragStart = (e) => {
    setOriginX(e.clientX);
    setOriginY(e.clientY);
    setIsDrag(true);
  };

  const onDrag = (e) => {
    // console.log('dragging...');
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
    setIsDrag(false);
  };

  return (
    <>
      <MapWrapper>
        <MapImage
          posX={posX}
          posY={posY}
          draggable
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          {/* 2907 * 3460 */}
          <img
            src={process.env.PUBLIC_URL + '/images/map.png'}
            ref={mapImage}
          />
        </MapImage>
      </MapWrapper>
    </>
  );
}

const MapWrapper = styled.div`
  width: 1024px;
  height: 768px;
  border: 1px solid black;
  overflow: hidden;
`;

const MapImage = styled.div`
  position: relative;
  top: ${(props) => props.posY + 'px'};
  left: ${(props) => props.posX + 'px'};
`;

export default Map;
