import MenuComponent from './menu.component';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

/*

  grab menu from config

  convert color === 'white' ? headerContent?.logos?.dark : headerContent?.logos?.light

  figure out for nav className="'main' + color + (!isAtTop ? 'not-at-top' : '') + (expanded ? 'expanded' : '')" style={'height': height + 'px'}

*/


const mapStateToProps = state => {
  return {
    color: 'white', // needs to be dynamic
    className: 'main white expanded'
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

const MenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({})
)(MenuComponent);

export default MenuContainer;
