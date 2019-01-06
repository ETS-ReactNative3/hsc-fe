import _ from 'lodash';

const check = (authObj, aclGroups) => {
  const groups = _.cloneDeep(aclGroups);
  groups.push('admin');
  const currentAcl = _.get(authObj, 'ACL.list') || [];
  return groups.some((v) => currentAcl.indexOf(v) >= 0);
};

export default {
  check,
};
