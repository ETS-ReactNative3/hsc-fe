/**
*
* Modal
*
*/
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FullModal = ({ onConfirm, onClose, title, childrens, open, scrolling, size, basic, trigger, hiddenHeader, className, isNotConfirmAction }) => (
  <Modal closeOnEscape={false} closeOnRootNodeClick={false} open={open} basic={basic} onClose={onClose} trigger={trigger} size={size} className={className}>
    {!hiddenHeader && <Modal.Header>{title}</Modal.Header>}
    <Modal.Content scrolling={scrolling}>
      <Modal.Description>
        {childrens}
      </Modal.Description>
    </Modal.Content>
    {isNotConfirmAction && isNotConfirmAction === true ? <Modal.Actions>
      <Button onClick={onClose}>Cancel</Button>
    </Modal.Actions> : <Modal.Actions>
      <Button onClick={onConfirm}>Ok</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Modal.Actions>}
  </Modal>
);

FullModal.propTypes = {
  /** Modal content */
  childrens: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /** Modal title */
  title: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  /** Modal is opened */
  open: PropTypes.bool,
  /** Close function */
  onClose: PropTypes.func,
  /** Scrollable content */
  scrolling: PropTypes.bool,
  /** Modal size */
  size: PropTypes.string,
  /** Basic form */
  basic: PropTypes.bool,
  /** Trigger button */
  trigger: PropTypes.object,
  /** Hidden header */
  hiddenHeader: PropTypes.bool,
  /** Class Name */
  className: PropTypes.string,
  onConfirm: PropTypes.func,

  /* View Modal*/
  isNotConfirmAction: PropTypes.bool,
};

export default FullModal;
