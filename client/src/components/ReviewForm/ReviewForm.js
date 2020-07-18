import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";

class ReviewForm extends Component {
  state = {
    comment: '',
    cuisineRating: null,
    serviceRating: null,
    backgroundRating: null,
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

  inputChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
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
              type="textarea"
              propertyName="comment"
              onChange={this.inputChangeHandler}
              value={this.state.comment}
              error={this.getFieldError('description')}
              required
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Submit review
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default ReviewForm;