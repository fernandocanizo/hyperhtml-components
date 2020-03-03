import { bind, wire, hyper } from 'https://unpkg.com/hyperhtml?module';

const Table = {
  html: bind(document.getElementById('table')),
  data: [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
    { label: 'three', value: 3 }
  ],
  state: {
    sorted: ''
  },
  handleEvent(e) {
    // stop the regular link behaviour
    e.preventDefault();
    // get the current link
    const link = e.target;
    // read the attribute data-target, this will tell us how to sort the
    // array
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    // simple sort, reverse the sort if asc is true
    this.data.sort((a, b) =>
      (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    // update the sorted attr
    this.state.sorted = asc ? '' : attr;
    // re-render
    this.render();
  },
  render() {
    return hyper`
    <table>
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.data.map(o =>
          wire(o)`<tr><td>${o.label}</td><td>${o.value}</td></tr>`)}
      </tbody>
    </table>
  `;
  }
};

Table.render();
