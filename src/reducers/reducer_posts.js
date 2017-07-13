import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function ( state = {}, action ) {
	switch(action.type) {
		case DELETE_POST:
			// Remove a post from app. state by id
			// and return a new object without it
			return _.omit(state, action.payload);
		case FETCH_POST:						// lecture 144
			console.log('...state', { ...state, [action.payload.data.id]: 'ten'});
			// const post = action.payload.data;
			// const newState = { ...state };
			// newState[post.id] = post;
			// return newState;

			return {...state, [action.payload.data.id]: action.payload.data};  // Identical. ES6 feature
		case FETCH_POSTS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}