import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {addPlace} from "../../store/actions/placesActions";
import PlaceForm from "../../components/PlaceForm/PlaceForm";

const NewPlace = () => {
  const error = useSelector(state => state.places.error)
  const dispatch = useDispatch();
  const addPlaceHandler = async (placeData) => {
    await dispatch(addPlace(placeData));
  };

  return (
    <>
      <Box pb={2} pt={2}>
        <Typography variant="h4">Add New Place</Typography>
      </Box>

      <PlaceForm
        onSubmit={addPlaceHandler}
        error={error}
      />
    </>
  );
};

export default NewPlace;