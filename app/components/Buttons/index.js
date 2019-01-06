import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ROUTES } from 'shared/constants';
import { ContextMenu, MenuActions } from './contextMenu';

export const EditBtn = ({ action }) => <Button type="button" circular icon="edit" primary onClick={action} />;

export const ViewBtn = ({ action }) => <Button type="button" circular icon="eye" primary onClick={action} />;

export const CopyBtn = ({ action }) => <Button type="button" circular icon="copy" onClick={action} />;

export const SaveCircularBtn = ({ action }) => <Button type="button" circular icon="check circle" positive onClick={action} />;

export const DeleteBtn = ({ action, square, content, labelPosition }) => <Button type="button" circular={!square} content={content} icon="delete" labelPosition={labelPosition} negative onClick={(e, data) => confirm("Sei sicuro di eliminare l'elemento ?\nL'operazione non può essere annullata!") ? action(e, data) : null} />; // eslint-disable-line

export const SaveBtn = ({ action, disabled, fluid, content }) => <Button type="button" fluid={fluid} disabled={disabled} onClick={action} icon="save" labelPosition="left" positive content={content || 'Salva'} />;

export const AddBtn = ({ action, disabled, label }) => <Button type="button" disabled={disabled} icon="plus" labelPosition="left" primary content={label} onClick={action} />;

export const PlusBtn = ({ action }) => <Button type="button" circular icon="plus" primary onClick={action} style={{ cursor: 'pointer', position: 'absolute', top: '50%', transform: 'translateY(-50%)', marginTop: 5, right: 5, zIndex: 2, height: 30, width: 30, padding: 0, fontSize: 11, border: '4px solid #fff', paddingBottom: 1, paddingRight: 0 }} />;

export const MoreActionBtn = ({ action }) => <Button type="button" circular style={{ color: '#fff', padding: 0 }} onClick={action}><ContextMenu icon="setting" /></Button>;

export const BtnWithActions = ({ actions, otherActions }) => <Button as="div" circular style={{ color: '#fff', padding: 0, verticalAlign: 'bottom', marginBottom: 1 }}><MenuActions actions={actions} otherActions={otherActions} icon="setting" /></Button>;

export const EscPraticaButton = ({ history }) => (
  <Button
    fluid
    content="Esci"
    onClick={() => confirm('Sei sicuro di voler uscire dalla pratica') ? history.push(ROUTES.PRATICHE) : null} // eslint-disable-line
  />
);

EscPraticaButton.propTypes = {
  history: PropTypes.object,
};

SaveCircularBtn.propTypes = {
  action: PropTypes.func,
};

ViewBtn.propTypes = {
  action: PropTypes.func,
};

CopyBtn.propTypes = {
  action: PropTypes.func,
};

MoreActionBtn.propTypes = {
  action: PropTypes.func,
};

BtnWithActions.propTypes = {
  actions: PropTypes.array,
  otherActions: PropTypes.array,
};

PlusBtn.propTypes = {
  action: PropTypes.func,
};

EditBtn.propTypes = {
  action: PropTypes.func,
};

DeleteBtn.propTypes = {
  action: PropTypes.func,
};

SaveBtn.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  content: PropTypes.string,
};

AddBtn.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
