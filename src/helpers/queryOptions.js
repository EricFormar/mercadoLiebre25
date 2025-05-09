module.exports = ({order, limit, offset}) => {
  return {
    order: order ? [[order]] : [['id', 'ASC']],
    limit: limit ? parseInt(limit) : 10,
    offset: offset ? parseInt(offset) : 0
  }
};