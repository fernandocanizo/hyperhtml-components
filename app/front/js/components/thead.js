import { wire, Component } from 'https://unpkg.com/hyperhtml?module';

class thead extends Component {
  onclick(e) {
    // stop the regular link behaviour
    e.preventDefault();
    // get the current link
    const link = e.target;
    // read the attribute data-target, to know how to sort the data
    const column = link.dataset.target;
    // publish sort
    this.dispatch('sort', { column });
  }

  render() {
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);

    return this.html`
      <thead>
        <tr>
          ${headers.map(v =>
            wire()`<th>
              <a onclick="${this}"
                data-target="${v}"
                href="#">${v.toUpperCase()}
              </a>
            </th>`)}
        </tr>
      </thead>
    `;
  }

  update(props) {
    this.props = props;
    return this.render();
  }
};

export {
  thead,
};
