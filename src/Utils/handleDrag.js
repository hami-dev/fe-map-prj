export const handleOnDrag = ({ dInfo, dAct }) => {
  if (dInfo.nx > 0) {
    dAct.setMoveLeft(true);
    return;
  }
  if (dInfo.chaX < 0 && dInfo.nx < dInfo.rightLimit) {
    dAct.setMoveRight(true);
    return;
  }
  if (dInfo.chaY > 0 && dInfo.ny > 0) {
    dAct.setMoveTop(true);
    return;
  }
  if (dInfo.chaY < 0 && dInfo.ny < dInfo.bottomLimit) {
    dAct.setMoveBottom(true);
    return;
  }
};

export const handleDragEnd = ({ dInfo, dAct }) => {
  if (dInfo.nx > 0) {
    dAct.setPosX(0);
    dAct.setMoveLeft(false);
    return;
  }
  if (dInfo.nx < dInfo.rightLimit) {
    dAct.setPosX(dInfo.rightLimit);
    dAct.setMoveRight(false);
    return;
  }
  if (dInfo.ny > 0) {
    dAct.setPosY(0);
    dAct.setMoveTop(false);
    return;
  }
  if (dInfo.ny < dInfo.bottomLimit) {
    dAct.setPosY(dInfo.bottomLimit);
    dAct.setMoveBottom(false);
    return;
  }

  dAct.setPosX(dInfo.nx);
  dAct.setPosY(dInfo.ny);
};
