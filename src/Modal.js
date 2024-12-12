import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Updated background color
  backdropFilter: 'blur(10px)', // Added backdrop filter for blurring
  borderRadius: '10px', // Added border radius
  padding: '20px' // Added padding for content spacing
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Updated background color with transparency
  zIndex: 1000
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginBottom:'10px' }}>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
