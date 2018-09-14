import MenuComponent from './menu.component';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

const MenuContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
  })
)(MenuComponent);

export default MenuContainer;
