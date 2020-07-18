import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

class PlaceForm extends Component {
  state = {
    title: '',
    description: '',
    titleImage: '',
    images: [],
    reviews: [],
    checkbox: false,
  };

  inputChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
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

  getFieldError = fieldName => {
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
              type="text"
              propertyName="title"
              title="Title"
              onChange={this.inputChangeHandler}
              value={this.state.title}
              error={this.getFieldError('title')}
              required
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="textarea"
              propertyName="description"
              title="Recipe"
              onChange={this.inputChangeHandler}
              value={this.state.description}
              error={this.getFieldError('description')}
              required
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="titleImage"
              title="Main photo"
              onChange={this.fileChangeHandler}
              error={this.getFieldError('titleImage')}
            />
          </Grid>
          <Grid item container xs justify="space-between">
            <Grid item xs={4}>
              <Typography variant="p">By submitting this form, you agree that the following information will be submitted to the public domain, and administrators of this site will have full control over the said information.</Typography>
            </Grid>
            <Grid item xs>
              <Checkbox
                label="I agree"
                onClick={() => this.setState({checkbox: !this.state.checkbox})}
                checked={false}
                required
                // value={this.state.checkbox}
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Submit new place
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PlaceForm;