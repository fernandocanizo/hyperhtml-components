import { Component } from 'https://unpkg.com/hyperhtml?module';

class tfoot extends Component {
  render() {
    return this.html`
      <tfoot>
        <tr>
          <th colspan="${this.props.data.length}">
            Rows: ${this.props.data.length}
          </th>
        </tr>
      </tfoot>
    `;
  }

  update(props) {
    this.props = props;
    return this.render();
  }
}

export {
  tfoot,
};
