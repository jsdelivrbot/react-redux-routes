import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchPost( id );  						// Calling an Action creator
	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});							// Calling an Action creator
	}

	render() {
		const { post } = this.props;

		if(!post) {
			return <div>Loading...</div>;
		}

		return(
			<div>
				<Link to="/">Home</Link>
				<button type="button" onClick={this.onDeleteClick.bind(this)} className="btn btn-danger pull-xs-right">Delete</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		)
	}
}

function mapStateToProps({ posts }, ownProps) {  // ownProps === this.props
	return { post: posts[ownProps.match.params.id] }; // Doing this, we can write in the render() method smth. like
																										// this.props.post     instead of
																										// this.props.posts[this.props.match.params.id]
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);