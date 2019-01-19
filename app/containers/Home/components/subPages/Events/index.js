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
import banner8 from 'images/Banner8.jpg';
import banner9 from 'images/Banner9.png';
// import CustomGrid from '../../../components/CustomGrid';
import CustomModal from './Modal/index';
import HomeService from '../../../../../shared/services/api/home/index';

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
      listItems: [],
      openModal: false,
    };
  }

  componentWillMount() {
    this.loadingDataTable();
  }

  loadingDataTable = () => {
    HomeService.getList({}).then((res) => {
      const listItems = _.get(res, 'results', []);
      this.setState({
        listItems: this.formatDataTable(listItems),
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  formatDataTable = (listEvents) => {
    console.log(listEvents);
    const results = [];
    if (listEvents && listEvents.length > 0) {
      listEvents.forEach((item, idx) => {
        const gridItem = {
          key: `${item.pk}-${idx}`,
          id: item.pk,
          name: item.name,
          host: item.host,
          description: item.description,
          date: item.date,
          imgUrl: banner7,
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

  render() {
    const { openModal, eventItem, listItems } = this.state;
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
          <div>
            <img alt="car1" src={banner9} />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div>
            <img alt="car2" src={banner8} />
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div>
            <img alt="car3" src={banner3} />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>
        <CustomGrid listItem={listItems} clickToOpen={this.handleOpenModal} />
        {openModal ? <CustomModal
          ref={(el) => { this.form = el; }}
          handleOpenModal={this.handleOpenModal}
          closeModal={this.handleCLoseModal}
          openModal={openModal}
          eventItem={eventItem}
        /> : null}
      </div>
    );
  }
}

Events.propTypes = {
  // elementId: PropTypes.string,
};

export default Events;
