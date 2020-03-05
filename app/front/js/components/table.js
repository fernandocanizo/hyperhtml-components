import { bind, wire, Component }
  from 'https://unpkg.com/hyperhtml?module';
import { thead } from './thead.js';
import { tbody } from './tbody.js';
import { tfooter } from './tfoot.js';

class table extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  get defaultState() {
    return {
      sortColumn: '',
      reverse: false,
    };
  }

  onsort(e) {
    e.preventDefault();
    // get the sort details
    const { column } = e.detail;
    const reverse = (column === this.state.sortColumn) ?
      ! this.state.reverse : this.state.reverse;
    // simple sort, reverse the sort if reverse state is true
    this.props.data.sort((a, b) =>
      (String(a[column])).localeCompare(String(b[column]))
        * (reverse ? -1 : 1));
    // update the sorted column and reverse status
    this.setState({
      sortColumn: column,
      reverse,
    });
    // no render set state will do a render
  }

  render() {
    // TODO verify all objects share the same headers
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);

    return this.html`
    <table id="${this.props.id}" onsort="${this}">
      ${thead.for(this).update(this.props)}
      ${tbody.for(this).update(this.props)}
      ${tfoot.for(this).update(this.props)}
    </table>
  `;
  }
};

export {
  table
};
