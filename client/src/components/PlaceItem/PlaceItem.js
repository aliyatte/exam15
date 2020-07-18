import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {apiURL} from "../../constants";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deletePlace,} from "../../store/actions/placesActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
});

const PlaceItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const image = apiURL + "/" + props.titleImage;

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <CardActionArea component={Link} to={"/places/" + props.id}>
            <CardMedia
              component="img"
              alt={props.title}
              height="300"
              image={image}
              title={props.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Box pb={2} px={2}>
            <Grid item container xs justify="space-between" alignItems="center">
              <Grid item container xs={8} justify="flex-end">
                {props.role === "admin" && (
                  <Button
                    onClick={() => dispatch(deletePlace(props.id))}
                    color="secondary"
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

PlaceItem.propTypes = {
  titleImage: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PlaceItem;