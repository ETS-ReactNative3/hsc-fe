import React from 'react';
// import { Pagination } from 'semantic-ui-react';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import FullModal from 'components/Modal';
// import SemanticTableGrid from 'semantic-table-grid';
import FlashMessage from 'components/Forms/UI/FlashMessage';
// import { formatMessage } from '../../containers/TextProvider';
import './css/styles.css';

let showFlashMessage = false;
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.form = null;
    this.state = {
      test: 'hihi',
    };
  }

  componentDidMount() {
    showFlashMessage = false;
    this.loadingDataTable({ page: 1 });
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  loadingDataTable = () => {
    this.setState({
      listRole: this.props.rowTable,
    });
  };

  handleCancel = () =>
    this.setState({
      openDeleteConfirm: false,
    });

  handleConfirm = () => {
    this.setState({
      openDeleteConfirm: false,
    });
  };

  render() {
    const { msgAlert, openDeleteConfirm, test, listRole } = this.state;
    console.log(test);
    console.log(listRole);
    // const columnTable = this.props.columnTable;
    // const pageCount = _.get(this.props.inforOfPage, 'pageCount', 1);
    const tblEngine = (
      <div className="container-list table-engine">
        {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}
      </div>
    );
    return (
      <div>
        {openDeleteConfirm ? (
          <FullModal
            title="Warning"
            open={openDeleteConfirm}
            childrens={this.state.messageAlert}
            onConfirm={this.handleConfirm}
            onClose={this.handleCancel}
          />
        ) : null}
        {tblEngine}
      </div>
    );
  }
}

TableList.propTypes = {
  rowTable: PropTypes.any,
  // columnTable: PropTypes.any,
  // isLoading: PropTypes.any,
  // inforOfPage: PropTypes.any,
  // loadingDataTable: PropTypes.func,
  onRef: PropTypes.any,
};

export default TableList;
