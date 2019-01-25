import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { CustomGrid } from 'components/CustomGrid';
import banner1 from 'images/Banner1.jpg';
import banner2 from 'images/banner2.png';
import banner3 from 'images/Banner3.png';
// import banner4 from 'images/Banner4.jpg';
import banner5 from 'images/Banner5.png';
import banner6 from 'images/Banner6.png';
import banner7 from 'images/Banner7.jpg';
import banner10 from 'images/Banner10.png';
import banner11 from 'images/Banner11.png';
import banner12 from 'images/Banner12.jpg';
import banner13 from 'images/Banner13.png';
import banner14 from 'images/Banner14.jpg';
import banner15 from 'images/Banner15.jpg';
import banner16 from 'images/Banner16.png';
import banner17 from 'images/Banner17.jpg';
import banner18 from 'images/Banner18.jpg';
import banner19 from 'images/Banner19.png';
import banner20 from 'images/Banner20.png';
import FlashMessage from 'components/Forms/UI/FlashMessage';

// import CustomGrid from '../../../components/CustomGrid';
import { handleErrorMessage, handleSuccessMessage } from '../../../../../shared/lib/msgFormatter';

import CustomModal from './Modal/index';
import HomeService from '../../../../../shared/services/api/home/index';

let showFlashMessage = false;

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
      isReloadList: false,
      listItemDemo: [
        { key: 1, id: 1, name: '✅ NHẬN ĐỊNH THỊ TRƯỜNG CƠ SỞ TUẦN 14/01 - 18/01/2019', imgUrl: banner1, description: 'Một tuần biến động theo biên độ hẹp và giao dịch khá giằng co của thị trường, chỉ số Vnindex đang tiếp cận vùng kháng cự quanh khu vực 910 - 920 điểm nên lực mua lên cũng dè chừng và thận trọng hơn, các cổ phiếu tiếp tục phân hóa. Theo dõi livestream để nhìn nhận tình trạng dòng tiền cho chiến lược thời gian tới. 📢 20:00 - Livestream nhận định thị trường chứng khoán cơ sở tuần qua và chiến lược giao dịch cho tuần mới. Qúy nhà đầu tư để lại thắc mắc về cổ phiếu bên dưới phần cmt ạ. 🔔 A/c vui lòng like và share post này để xem được livestream nhé' },
        { key: 2, id: 2, name: 'Nhận định thị trường phái sinh ngày 10.01.2019', imgUrl: banner6 },
        { key: 3, id: 3, name: 'BẢN TIN HỢP ĐỒNG TƯƠNG LAI 9/1', imgUrl: banner5 },
        { key: 4, id: 4, name: '💼 LÀM SAO ĐỂ KIẾM TIỀN TỪ PHÁI SINH 💼', imgUrl: banner7, description: '💱 PHÁI SINH: kênh đầu tư hiệu quả cao với số vốn đầu tư nhỏ. 💱 Chi phí giao dịch cực thấp so với các loại hình chứng khoán khác. LỢI NHUẬN LỚN NHƯNG CŨNG TIỀM ẨN NHIỀU RỦI RO! Vì vậy, HSC DCG TEAMJOY tổ chức buổi hội thảo LÀM SAO ĐỂ KIẾM TIỀN TỪ PHÁI SINH 📊 Để giúp bạn hiểu rõ hơn về Chứng khoán Phái sinh. 📊 Biết cách mở tài khoản, giao dịch online. 📊 Nắm được chìa khóa giao dịch thành công. ===================================. Thời gian: 20h, 10/01/2018. Địa điểm: Hội thảo online (Vé tham dự sẽ được gửi qua email)' },
        { key: 5, id: 5, name: ' NHẬN ĐỊNH TT CHỨNG KHOÁN PHÁI SINH NGÀY 07/01/2019', imgUrl: banner2 },
      ],
      arrImage: [
        banner3,
        banner10,
        banner11,
        banner12,
        banner13,
        banner14,
        banner15,
        banner16,
        banner17,
        banner18,
        banner19,
        banner20,
      ],
      listItems: [],
      openModal: false,
    };
  }

  componentWillMount() {
    showFlashMessage = false;
    this.loadingDataTable();
    this.prepareCarouselData();
  }

  onError = (msg) => {
    const msgAlert = handleErrorMessage(msg);
    this.setState({
      msgAlert,
    }, this.handleShowFlashMessage());
  };

  handleReturnMessage = (name, typeAction) => {
    const msg = handleSuccessMessage(name, typeAction);
    this.setState(
      {
        msgAlert: msg,
        isLoading: true,
        openDeleteConfirm: false,
      }, this.handleShowFlashMessage());
  };

  loadingDataTable = () => {
    HomeService.getList({}).then((res) => {
      const listItems = _.get(res, 'results', []);
      this.setState({
        listItems: this.formatDataTable(listItems),
      });
    }).catch((errors) => {
      this.onError(errors);
      actions.setSubmitting(false);
    });
  }

  formatDataTable = (listEvents) => {
    const results = [];
    if (listEvents && listEvents.length > 0) {
      listEvents.forEach((item, idx) => {
        const gridItem = {
          key: `${item.pk}-${idx}`,
          id: item.pk,
          name: item.name,
          host: item.host,
          description: item.description,
          shortDescription: item.short_description,
          date: item.date,
          imgUrl: item.image,
        };
        results.push(gridItem);
      });
    }
    return results;
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({
      activeIndex,
      activeName: this.capitalizeFirstLetter(e.target.text),
      isReloadList: true,
    });
  };

  capitalizeFirstLetter = (str) => {
    const temp = str.toLowerCase();
    return temp[0].toUpperCase() + temp.slice(1);
  };

  handleDisableReloadList = () => {
    this.setState({
      isReloadList: false,
    });
  };

  handleOpenModal = (item) => {
    this.setState({
      openModal: true,
      eventItem: item,
    });
  }

  handleCLoseModal = () => {
    this.setState({
      openModal: false,
    });
  }

  handleShowFlashMessage = () => {
    showFlashMessage = true;
    setTimeout(() => {
      showFlashMessage = false;
      this.forceUpdate();
    }, 6000);
  };

  prepareCarouselData = () => {
    const { arrImage } = this.state;
    const results = [];
    arrImage.forEach((item, idx) => {
      const altId = `car${idx}`;
      const carItem = (
        <div key={altId}>
          <img alt={altId} src={item} />
          {/* <p className="legend">Legend 1</p> */}
        </div>
      );
      results.push(carItem);
    });
    this.setState({
      arrCarousel: results,
    });
  }

  render() {
    const { openModal, eventItem, listItems, arrCarousel, msgAlert } = this.state;
    return (
      <div>
        <Grid className="header-list">
          <Grid.Row>
            {/* <Grid.Column computer={2} tablet={2} largeScreen={1} mobile={2}>
              <Icon name="id card" size="huge" />
            </Grid.Column> */}
            {/* <Grid.Column computer={16} tablet={16} largeScreen={16} mobile={16}> */}
            {/* <h2>HSC {activeName}</h2>
              <span>Test HSC {activeName}</span> */}
            {/* </Grid.Column> */}
          </Grid.Row>
        </Grid>
        <Carousel>
          {arrCarousel}
        </Carousel>
        <CustomGrid listItem={listItems} clickToOpen={this.handleOpenModal} />
        {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}

        {openModal ? <CustomModal
          ref={(el) => { this.form = el; }}
          handleOpenModal={this.handleOpenModal}
          closeModal={this.handleCLoseModal}
          openModal={openModal}
          eventItem={eventItem}
          onError={this.onError}
          handleReturnMessage={this.handleReturnMessage}
        /> : null}
      </div>
    );
  }
}

Events.propTypes = {
  // elementId: PropTypes.string,
};

export default Events;
