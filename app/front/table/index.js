import { bind } from 'https://unpkg.com/hyperhtml?module';
import { table } from '../js/components/table.js';

const data = [
  { producto: 'banana', cantidad: 1, precio: 12.99 },
  { producto: 'pera', cantidad: 2, precio: 1.99 },
  { producto: 'papa', cantidad: 3, precio: 7.99 },
];

bind(document.body)`${new table({ data, id: 'myTable' })}`;
