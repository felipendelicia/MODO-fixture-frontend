import React from 'react'

import "./Modal.css"

interface ModalTypeProps{
  toggleState:()=>void
}

const Modal = (props:ModalTypeProps) => {
  return (
    <div className="modal-container">
        <div className="modal-main">
          <div className="modal-component-showed">
          </div>
          <div className='modal-close-button' onClick={props.toggleState}>
            Cerrar
          </div>
        </div>
    </div>
  )
}

export default Modal