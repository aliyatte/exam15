import React, {Component} from 'react';
import {fetchPlaces} from "../../store/actions/placesActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PlaceItem from "../../components/PlaceItem/PlaceItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';

class Places extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  render() {
    return (
      <Box mt={3}>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                All places
              </Typography>
            </Grid>
            {this.props.user && (
              <Grid item>
                <Button
                  color="primary"
                  component={Link}
                  to={"/places/new"}
                >
                  Add new place
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item container direction="row" justify="space-evenly" spacing={2}>
            {this.props.places.map(place => (
              <PlaceItem
                key={place._id}
                title={place.title}
                id={place._id}
                recipe={place.recipe}
                image={place.image}
                user={this.props.user&&this.props.user._id}
                token={place.user.token}
                role={this.props.user&&this.props.user.role}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  places: state.places.places,
});

const mapDispatchToProps = dispatch => ({
  fetchPlaces: () => dispatch(fetchPlaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Places);