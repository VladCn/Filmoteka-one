import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

console.log("11111111111111")
const options = {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  }

  const pagination = new Pagination('#tui-pagination-container', options);
  console.log(pagination)
