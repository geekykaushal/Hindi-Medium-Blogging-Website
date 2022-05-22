import {
    CREATE_POST_FAIL,
    CREATE_POST_SUCCESS,
    CLEAR_STATUS,
    GET_ALL_POST_SUCCESS,
    GET_ALL_POST_FAIL,
    CLEAR_LOADING,
    DELETE_POST_FAIL,
    DELETE_POST,
    GET_SINGLE_POST,
    GET_SINGLE_POST_FAIL,
    FILTER_POST_SUCCESS,
    ALL_POSTS_fAIL,
    ALL_POSTS
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                imageStatus: true,
                allposts: [...state.allposts, action.payload],
                error: null
            }

        case CREATE_POST_FAIL:
            return {
                ...state,
                error: action.payload,
                imageStatus: false
            }

        case CLEAR_STATUS:
            return {
                ...state,
                imageStatus: false
            }

        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                allposts: action.payload,
                loading: true,
                error: null
            }

        case GET_ALL_POST_FAIL:
        case GET_SINGLE_POST_FAIL:
            case ALL_POSTS_fAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_LOADING:
            return {
                ...state,
                loading: false
            }

        case DELETE_POST:
            return {
                ...state,
                deleteStatus: action.payload
            }
        case DELETE_POST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case GET_SINGLE_POST:
            return {
                ...state,
                singlePost: action.payload
            }
        case FILTER_POST_SUCCESS:
            return {
                  ...state,
                  filterPost: state.allposts.filter((post) => {
                      const regex = new RegExp(`${action.payload}` , 'gi');
                      return (
                          post.title.match(regex)
                      )
                  })
            }
        case ALL_POSTS:
            return {
                ...state,
                allposts: action.payload,
                loading: true
            }
        default:
            return {
                ...state
            }
    }
}