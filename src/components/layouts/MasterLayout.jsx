import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MasterLayout extends Component {
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

MasterLayout.propTypes = {};

MasterLayout.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterLayout);
