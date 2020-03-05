import { bind, wire, Component } from 'https://unpkg.com/hyperhtml?module';

class Table extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  get defaultState() {
    return {
      sorted: ''
    }
  }
  onclick(e) {
    //stop the regular link behaviour
    e.preventDefault();
    //get the current link
    const link = e.target;
    //read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    //simple sort, reverse the sort if asc is true
    this.props.data.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    //update the sorted attr
    this.setState({
      sorted: asc ? '' : attr
    });
    //no render set state will do a render
  }
  render() {
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);
    // TODO verify all objects share the same headers

    return this.html`
    <table id="${this.props.id}">
      <thead>
        <tr>
          ${headers.map(v => `<th><a onclick="${this}" data-target="${v}" href="#">${v.toUpperCase()}</a></th>`)}
        </tr>
      </thead>
      <tbody>
        ${this.props.data.map(obj => wire(obj)`<tr>${headers.map(v => `<td>${obj[v]}</td>`)}</tr>`)}
      </tbody>
    </table>
  `;
  }
};

export {
  Table
};
