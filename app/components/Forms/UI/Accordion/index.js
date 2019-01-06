import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Accordion } from 'semantic-ui-react';
import styled from 'styled-components';
import './styles.css';

const CustomSpan = styled.span`
  color: #2185D0;
`;

const CustomH5 = styled.a`
  display: inline-block;
  padding-top: 10px;
  padding-left: 10px;
  color: black;
  font-size: 1.2em;
`;

const HiddenSpan = styled.span`
  display: none;
  color: red;
`;

export class CustomAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: '',
    };
  }

  componentWillMount() {
    this.setState({
      data: this.formatData(this.props.data),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: this.formatData(nextProps.data),
      });
    }
  }

  handleClickFamily = (familyName) => {
    this.props.getActiveName(familyName, '', 'family');
  }

  handleIndexChange = (event, value, dataParent) => {
    let tmpParent = '';
    let itemId = '';
    if (dataParent.includes('/')) {
      tmpParent = dataParent.split('/')[0];
      itemId = dataParent.split('/')[1];
    } else {
      tmpParent = dataParent;
    }
    let content = '';
    if (value && value.content.props && value.content.props.children[1].key) {
      itemId = value.content.props.children[1].key;
      content = value.content.props.children[0];
    } else if (value) {
      content = value.content;
    }
    const tmpActiveName = `${tmpParent} > ${content}`;
    this.setState({
      activeName: tmpActiveName,
    });
    this.props.getActiveName(tmpActiveName, itemId);
  }

  splitCount = (strCount) => {
    const result = strCount.split('/');
    return result;
  }

  formatData = (data) => {
    if (data) {
      const keyRootData = Object.keys(data);
      // Level 0 panel
      const rootPanels = [];
      keyRootData.forEach((firstElement, firstIdx) => {
        const tmpFirstData = data[keyRootData[firstIdx]];
        const arrFirstCount = this.splitCount(tmpFirstData.count);
        const styleCountFirstData = (
          <CustomH5 onClick={() => this.handleClickFamily(firstElement)}>{firstElement} - <CustomSpan>{arrFirstCount[0]}</CustomSpan><span>/{arrFirstCount[1]}</span></CustomH5>
        );
        const rootBlock = {
          key: `panel-${firstIdx}`, title: styleCountFirstData,
        };

        // // Level 1 panel'
        const secondData = Object.keys(tmpFirstData);
        const secondPanels = [];
        secondData.forEach((secondElement, secondIdx) => {
          const tmpSecondData = tmpFirstData[secondElement];
          if (secondElement !== 'count' && secondElement !== 'type') {
            let secondBlock = {};
            let Level2Content = {};
            if (secondElement === 'items') {
              if (tmpSecondData.length > 0) {
                tmpSecondData.forEach((itemElement) => {
                  const contentItemElement = (
                    <span>
                      {itemElement.shortDescription}
                      <HiddenSpan key={itemElement.id}>
                        {itemElement.id}
                      </HiddenSpan>
                    </span>
                  );
                  secondBlock = {
                    title: { content: contentItemElement }, content: { content: itemElement.price }, index: itemElement.id,
                  };
                });
              }
            } else {
              // itemLev2Key = '';
              secondBlock = {
                key: `panel-${firstIdx}${secondIdx}`, title: `${secondElement} - ${tmpSecondData.count}`,
              };
              const thirdPanels = [];
              const lev2Key = `lev-2-${secondBlock.key}`;
              const dataParentlev2 = `${firstElement} > ${secondElement}`;
              Level2Content = (
                <div>
                  <Accordion.Accordion key={lev2Key} panels={thirdPanels} onTitleClick={(event, value) => this.handleIndexChange(event, value, dataParentlev2, tmpSecondData.type)} />
                </div>
              );
              // Level 2 panel
              const thirdData = Object.keys(tmpSecondData);
              thirdData.forEach((thirdElement, thirdIdx) => {
                const tmpThirdData = tmpSecondData[thirdElement];
                if (thirdElement !== 'count' && thirdElement !== 'type') {
                  let thirdBlock = {};
                  if (thirdElement === 'items') {
                    if (thirdElement.length > 0) {
                      tmpThirdData.forEach((itemElement) => {
                        const contentItemElement = (
                          <span>
                            {itemElement.shortDescription}
                            <HiddenSpan key={itemElement.id}>
                              {itemElement.id}
                            </HiddenSpan>
                          </span>
                        );
                        thirdBlock = {
                          title: { content: contentItemElement }, content: { content: itemElement.price }, index: itemElement.id,
                        };
                      });
                    }
                  } else {
                    thirdBlock = {
                      key: `panel-${firstIdx}${secondIdx}${thirdIdx}`, title: `${thirdElement} - ${tmpThirdData.count}`,
                    };
                    const fourPanels = [];
                    const lev3Key = `lev-3-${thirdBlock.key}`;
                    const dataParentLev3 = `${firstElement} > ${secondElement} > ${thirdElement}`;
                    const arrItem = _.get(tmpThirdData, 'items', []);
                    // Level 3 panel
                    if (arrItem.length > 0) {
                      arrItem.forEach((fourElement) => {
                        const contentItemElement = (
                          <span>
                            {fourElement.shortDescription}
                            <HiddenSpan key={fourElement.id}>
                              {fourElement.id}
                            </HiddenSpan>
                          </span>
                        );
                        const fourBlock = {
                          title: { content: contentItemElement }, content: { content: fourElement.price }, index: fourElement.id,
                        };
                        // dataParentLev3 = `${dataParentLev3}/${fourElement.id}`;
                        fourPanels.push(fourBlock);
                      });
                    }
                    const Level3Content = (
                      <div>
                        <Accordion.Accordion key={lev3Key} panels={fourPanels} onTitleClick={(event, value) => this.handleIndexChange(event, value, dataParentLev3, tmpThirdData.type)} />
                      </div>
                    );
                    thirdBlock.content = { content: Level3Content };
                  }
                  thirdPanels.push(thirdBlock);
                }
              });
              secondBlock.content = { content: Level2Content };
            }
            secondPanels.push(secondBlock);
          }
        });
        const lev1Key = `lev-1-${rootBlock.key}`;
        const Level1Content = (
          <div>
            <Accordion.Accordion key={lev1Key} panels={secondPanels} onTitleClick={(event, value) => this.handleIndexChange(event, value, firstElement, tmpFirstData.type)} />
          </div>
        );
        rootBlock.content = { content: Level1Content };
        rootPanels.push(rootBlock);
      });
      return rootPanels;
    }
    return null;
  };

  render() {
    return (
      <Accordion defaultActiveIndex={0} panels={this.state.data} styled style={{ width: '100%' }} />
    );
  }
}

CustomAccordion.propTypes = {
  data: PropTypes.any,
  getActiveName: PropTypes.func,
};

export default CustomAccordion;
