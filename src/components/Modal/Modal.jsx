import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { StyledModalBackdrop, StyledModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = ({ code }) => {
    code === 'Escape' && this.props.onClose();
  };

  const handleBackdropClick = ({ target, currentTarget }) => {
    currentTarget === target && onClose();
  };

  return createPortal(
    <StyledModalBackdrop onClick={handleBackdropClick}>
      <StyledModalContent>{children}</StyledModalContent>
    </StyledModalBackdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};
