import { combineReducers } from "redux";

import {
  SET_PLACE_DETAILS,
  RECEIVE_PLACES,
  SET_CURRENT_POSITION,
  TOGGLE_LOADING,
  SUBMIT_REVIEW,
  SET_PLACE_TYPE,
  SYNC_PLACE_RATINGS
} from "../actions";
import { user } from "./user";

const initialState = {
  currentPosition: {
    longitude: "",
    latitude: ""
  },
  currentType: "",
  nearbyPlaces: [],
  selectedPlace: {
    id: null,
    ratingRes: {
      entrance: 0,
      parking: 0,
      bathroom: 0
    }
  }
};

// For developing purposes have the current coordinates fixed
const LATITUDE = 51.75391;
const LONGITUDE = 0.1278;

function selectedPlace(state = initialState.selectedPlace, action) {
  switch (action.type) {
    case SET_PLACE_DETAILS:
      return Object.assign({}, state, action.place);
    case SUBMIT_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.review.id]: {
            body: action.review.body,
            reviewer: action.review.reviewer
          }
        }
      };
    case SYNC_PLACE_RATINGS:
      return {
        ...state,
        ratingRes: action.ratingRes,
        ratings: action.ratings
      };
    default:
      return state;
  }
}

function currentPosition(
  state = { latitude: LATITUDE, longitude: LONGITUDE },
  action
) {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      const position = Object.assign({}, state, {
        latitude: action.position.latitude,
        longitude: action.position.longitude
      });
      return position;
    default:
      return state;
  }
}

function currentType(state = "Restaurant", action) {
  switch (action.type) {
    case SET_PLACE_TYPE:
      return action.placeType;
    default:
      return state;
  }
}

function nearbyPlaces(state = initialState.nearbyPlaces, action) {
  switch (action.type) {
    case RECEIVE_PLACES:
      return action.places;
    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentPosition,
  selectedPlace,
  nearbyPlaces,
  isLoading,
  currentType,
  user
});

export default rootReducer;
