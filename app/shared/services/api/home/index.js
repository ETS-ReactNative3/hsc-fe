import request from '../../../lib/request';
import { API } from '../../../constants';

const create = (content) => {
  const url = API.EVENTS;
  return request(
    {
      url,
      method: 'POST',
      data: content,
      type: 'uploadFile',
    });
};

const getList = (data) => {
  let url = API.EVENTS;
  let sort = '';
  let direction = '';
  let searchText = '';
  let page = '';
  if (data.page) {
    page = `&page=${data.page}`;
  }
  if (data.dataSearch) {
    const arrDataSearch = data.dataSearch;
    arrDataSearch.forEach((item) => {
      if (item.value && item.value !== '') {
        searchText += `&filter[0][${item.key}]=${item.value}`;
      }
    });
  }
  if (data.sort && data.direction !== 'none') {
    sort = `&filter[0][order-by]=${data.sort}`;
    direction = `&filter[0][direction]=${data.direction}`;
  }

  url += page + sort + direction + searchText;
  return request({
    url: `${url}?page_size=100`,
    method: 'GET',
  });
};

const getById = (id) => request(
  {
    url: `${API.EVENTS}${id}/`,
    method: 'GET',
  });

const deleteById = (id) =>
  request(
    {
      url: `${API.EVENTS}${id}/`,
      method: 'DELETE',
    });

const update = (id, content) => request(
  {
    url: `${API.EVENTS}${id}/`,
    method: 'PATCH',
    data: content,
  });

const addNewSubcriber = (eventId, subcriber) => {
  const url = `${API.EVENTS}${eventId}/subscribers/`;
  return request(
    {
      url,
      method: 'POST',
      data: subcriber,
    });
};

const getListSubcribers = (eventId) => {
  const url = `${API.EVENTS}${eventId}/subscribers/`;
  return request(
    {
      url,
      method: 'GET',
    });
};

const uploadFile = (img, id) => request(
  {
    url: `${API.EVENTS}${id}/`,
    method: 'PATCH',
    data: { event: {}, image: img },
    type: 'uploadFile',
  });

const HomeService = {
  create,
  getById,
  update,
  deleteById,
  getList,
  addNewSubcriber,
  getListSubcribers,
  uploadFile,
};

export default HomeService;
