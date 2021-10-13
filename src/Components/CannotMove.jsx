import React from 'react';
import styled from 'styled-components';

function CannotMove({ moveLeft, moveRight, moveTop, moveBottom }) {
  return (
    <CannotMoveDiv>
      {moveLeft && <CannotLeft></CannotLeft>}
      {moveRight && <CannotRight></CannotRight>}
      {moveTop && <CannotTop></CannotTop>}
      {moveBottom && <CannotBottom></CannotBottom>}
    </CannotMoveDiv>
  );
}

const gradientColor = '#f3918e67';
const gradientSize = '12rem';

const CannotMoveDiv = styled.div`
  width: 1024px;
  height: 768px;
`;

const CannotDiv = styled.div`
  position: absolute;
`;

const CannotLeft = styled(CannotDiv)`
  width: ${gradientSize};
  height: 768px;
  top: 0rem;
  left: 0rem;
  background: linear-gradient(to right, ${gradientColor}, transparent);
`;

const CannotRight = styled(CannotDiv)`
  width: ${gradientSize};
  height: 768px;
  top: 0rem;
  right: 0rem;
  background: linear-gradient(to left, ${gradientColor}, transparent);
`;

const CannotTop = styled(CannotDiv)`
  width: 1024px;
  height: ${gradientSize};
  top: 0rem;
  right: 0rem;
  background: linear-gradient(to bottom, ${gradientColor}, transparent);
`;

const CannotBottom = styled(CannotDiv)`
  width: 1024px;
  height: ${gradientSize};
  bottom: 0rem;
  left: 0rem;
  background: linear-gradient(to top, ${gradientColor}, transparent);
`;

export default CannotMove;
