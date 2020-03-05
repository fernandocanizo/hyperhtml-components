import { bind, wire, Component } from 'https://unpkg.com/hyperhtml?module';

class thead extends Component {
  onclick(e) {
    // stop the regular link behaviour
    e.preventDefault();
    // get the current link
    const link = e.target;
    // read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    // check if the user clicked on the same attr
    const asc = this.props.sorted === attr;
    // publish sort
    this.dispatch('sort', {attr, asc});
  }

  render() {
    // Take column labels from first object
    const headers = Object.keys(this.props.data[0]);

    return this.html`
      <thead>
        <tr>
          ${headers.map(v => `<th><a onclick="${this}" data-target="${v}" href="#">${v.toUpperCase()}</a></th>`)}
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
