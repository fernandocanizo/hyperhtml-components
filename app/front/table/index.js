import { bind, wire } from 'https://unpkg.com/hyperhtml?module';
import { Table } from './components/table.js';

const buttonClick = (e) => {
  e.preventDefault();
  const dataEl = document.getElementById('yourData');
  const formEl = document.getElementById('data');
  const tableEl = document.getElementById('table')

  try {
    const data = JSON.parse(dataEl.value);
    formEl.style = 'display: none';
    renderTable(tableEl, data);
  } catch (e) {
    console.error(e);
  }
};

const button = document.getElementById('buildTable');
button.addEventListener('click', buttonClick);

const html = bind();
const renderTable = (elementToBind, data) => {
  bind(elementToBind)`${new Table({ data, id: 'myTable' })}`;
};

