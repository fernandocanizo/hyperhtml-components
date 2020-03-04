import { bind, wire, Component } from 'https://unpkg.com/hyperhtml?module';

export class Table extends Component {
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
    return this.html`
    <table id="${this.props.id}">
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.props.data.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
  }
};
