import React from 'react';
import ReactDOM from 'react-dom';


function Modal(props) {
  return ReactDOM.createPortal(
    // Outer div is the backdrop, will catch onClick event and close modal
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      {/* Inner div is the modal body, need to stop onClick event proagation to prevent unwanted closure of modal*/}
      <div onClick={(e) => {e.stopPropagation()}} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;