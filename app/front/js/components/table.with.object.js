import { bind, wire } from 'https://unpkg.com/hyperhtml?module';


const Table = {
  html: bind(document.getElementById('table')),

  data: [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
    { label: 'three', value: 3 },
    { label: 'four', value: 4 },
    { label: 'five', value: 5 },
    { label: 'six', value: 6 },
  ],

  state: {
    sorted: ''
  },

  handleEvent(e) {
    console.log(e, e.target, this);
    // stop the regular link behaviour
    e.preventDefault();
    // get the current link
    const link = e.target;
    // read the attribute data-target, this will tell us how to sort the
    // array
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    const ascending = this.state.sorted === attr;
    const reverse = ascending ? 1 : -1;
    // simple sort, reverse the sort if ascending is true
    this.data.sort((a, b) =>
      (String(a[attr])).localeCompare(String(b[attr])) * reverse);
    // update the sorted attr
    this.state.sorted = ascending ? '' : attr;
    // re-render
    this.render();
  },

  render() {
    return this.html`
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
