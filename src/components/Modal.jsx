import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

function Modal(props) {
  return ReactDOM.createPortal(
    // Outer div is the backdrop, will catch onClick event and close modal
    <div onClick={() => history.push("/")} className="ui dimmer modals visible active">
      {/* Inner div is the modal body, need to stop onClick event proagation to prevent unwanted closure of modal*/}
      <div onClick={(e) => {e.stopPropagation()}} className="ui standard modal visible active">
        <div className="header">Delete Stream</div>
        <div className="content">Are you sure you want to delete this scream?</div>
        <div className="actions">
          <button className="ui primary button">Delete</button>
          <button className="ui button">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;