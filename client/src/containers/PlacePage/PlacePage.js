import React, {Component} from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {apiURL, labels} from "../../constants";
import {deletePlace, fetchPlace, updatePlace} from "../../store/actions/placesActions";

class PlacePage extends Component {
  componentDidMount() {
    this.props.fetchPlace(this.props.match.params.id);
  }

  render = () => {
    const {
      title,
      description,
      image,
      images,
      _id,
      reviews
    } = this.props.place;

    return (
      <>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  place: state.places.place,
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlace: (placeId) => dispatch(fetchPlace(placeId)),
  updatePlace: (placeData, placeId) => dispatch(updatePlace(placeData, placeId)),
  deletePlace: (placeId) => dispatch(deletePlace(placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);