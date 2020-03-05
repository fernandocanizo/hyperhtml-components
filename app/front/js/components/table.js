import { bind, wire, Component }
  from 'https://unpkg.com/hyperhtml?module';
import { thead } from './thead.js';

class table extends Component {
  constructor(props) {
    super();
    this.props = props;
    console.log(props);
  }

  get defaultState() {
    return {
      id: '',
      data: [],
      sorted: ''
    }
  }

  onsort(e) {
    //console.log(e, this, e.currentTarget, e.detail)
    e.preventDefault();
    // get the sort details
    const {attr, asc} = e.detail;
    // simple sort, reverse the sort if asc is true
    this.data.sort((a, b) =>
      (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    // update the sorted attr
    this.setState({
       sorted: asc ? '' : attr
    });
    // no render set state will do a render
  }

  render() {
    // TODO verify all objects share the same headers
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);

    return this.html`
    <table id="${this.props.id}">
    <table id="${this.props.id}"
      onsort="${this}"
      >
      ${thead.for(this).update(this.props)}
      <tbody>
        ${this.props.data.map(obj =>
          wire(obj)`<tr>${headers.map(v =>
            `<td>${obj[v]}</td>`)}</tr>`)}
      </tbody>
    </table>
  `;
  }
};

export {
  table
};
