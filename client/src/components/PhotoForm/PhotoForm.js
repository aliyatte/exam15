import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";

class PhotoForm extends Component {
  state = {
    image: '',
  };

  submitFormHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(this.state).forEach((key) => {
      let value = this.state[key];
      formData.append(key, value);
    });
    this.props.onSubmit(formData);
  };

  fileChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  getFieldError = (fieldName) => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="image"
              title="Image"
              onChange={this.fileChangeHandler}
              error={this.getFieldError("image")}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PhotoForm;