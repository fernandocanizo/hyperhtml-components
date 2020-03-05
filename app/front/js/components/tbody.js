import { wire, Component }
  from 'https://unpkg.com/hyperhtml?module';

class tbody extends Component {
  render() {
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);

    return this.html`
      <tbody>
        ${this.props.data.map(obj =>
          wire(obj)`<tr>${headers.map(v =>
            `<td>${obj[v]}</td>`)}</tr>`)}
      </tbody>
    `;
  }

  update(props) {
    this.props = props;
    return this.render();
  }
}

export {
  tbody,
};
