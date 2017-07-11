import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost} from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		console.log(this.props);
		const { id } = this.props.match.params;
		this.props.fetchPost( id );
	}

	render() {
		const { props } = this.props;

		return(
			<div>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		)
	}
}

function mapStateToProps({ posts }, ownProps) {  // ownProps === this.props
	console.log('posts', posts);
	return { post: posts[ownProps.match.params.id] }; // Doing this, we can write in the render() method smth. like
																										// this.props.post     instead of
																										// this.props.posts[this.props.match.params.id]
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);