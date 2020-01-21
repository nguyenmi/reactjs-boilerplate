import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MasterLayout extends Component {

  componentDidMount() {
   
  }

  componentDidUpdate(prevProps, prevState) {

  }


  render() {
    return (
      <div>Master layout</div>
    );
  }
}

MasterLayout.propTypes = {

};

MasterLayout.defaultProps = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({

  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterLayout);
