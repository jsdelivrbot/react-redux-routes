import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	// Helper method
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		// console.log('field', field);

		return(
			<div className={className}>
				<label>{field.label}</label>
				<input
					type="text"
					className="form-control"
					// onChange={field.input.onChange}
					// onFocus={field.input.onFocus}
					// onBlur={field.input.onBlur}
					{...field.input}   // Identically. JSX feature
				/>
				<div className="text-help">
					{ touched ? error : ''}
				</div>
			</div>
		)
	}

	onSubmit(values) {
		// this === component
		this.props.createPost(values, () => {			// Use callback, because we have to wait until Post will be created
			this.props.history.push('/');						// Redirect to page of posts list
		});
	}

	render() {
		const { handleSubmit }  = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title for Post"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		)
	}
}

function validate(values) {
	const errors = {}

	if(!values.title) {
		errors.title = "Enter a title!";
	}

	if(!values.categories) {
		errors.categories = "Enter a category!";
	}

	if(!values.content) {
		errors.content = "Enter a content!";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect	(null, { createPost })(PostsNew)
);