import React, { useRef } from "react";
import { createPortal } from "react-dom";
import Button from "antd/lib/button";
import Modal from "./modal";
import { getSetting, saveLocalSetting } from "./utils";

const Setting = props => {
  const modalRef = useRef();

  return (
    <React.Fragment>
      <Button
        icon="setting"
        onClick={() => {
          modalRef.current.toggle();
        }}
      />
      {createPortal(<Modal {...props} ref={modalRef} />, document.body)}
    </React.Fragment>
  );
};

export default Setting;
export { getSetting as getConfigs };
export { saveLocalSetting as setConfigs };
