import request from '../../../lib/request';
import { API } from '../../../constants';

const create = (content) => {
  let url = '';
  url = API.TEST;
  return request(
    {
      url,
      method: 'POST',
      data: content,
    });
};

const getList = (data) => {
  let url = API.TEST;
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
    url,
    method: 'GET',
  });
};

const getById = (id) => request(
  {
    url: `${API.TEST}/${id}`,
    method: 'GET',
  });

const deleteById = (id) =>
  request(
    {
      url: `${API.TEST}/${id}`,
      method: 'DELETE',
    });

const update = (id, content) => request(
  {
    url: `${API.TEST}/${id}`,
    method: 'PUT',
    data: content,
  });

const OfferService = {
  create,
  getById,
  update,
  deleteById,
  getList,
};

export default OfferService;
