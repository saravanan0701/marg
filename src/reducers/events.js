import actions from "../actions";

const INITIAL_EVENT_STATE = {
  data : {
    next_event : [
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      }
    ],
    past_event : [
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      },
      {
          "type": "Lecture",
          "title": "The Story of India's Unicorns",
          "venue": "Mumbai",
          "date": "Friday, August 31, 2019 ",
          "time": "6.00 to 7.30 pm",
          "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
      }
    ]
  },
  next_event : [
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
  ],
  past_event : [
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    },
    {
        "type": "Lecture",
        "title": "The Story of India's Unicorns",
        "venue": "Mumbai",
        "date": "Friday, August 31, 2019 ",
        "time": "6.00 to 7.30 pm",
        "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
    }
  ],
  next_view_more : false,
  past_view_more : false
}

export const EventReducers = (state = INITIAL_EVENT_STATE, action) => {
  switch (action.type) {

    case 'TOGGLE_NEXT_EVENT':
      let sliced_next_array = state.data.next_event.slice(state.next_event.length,state.next_event.length+4);
      return {
        ...state,
        next_view_more : state.next_event.length + 4 < state.data.next_event.length ? true : false,
        next_event : [...state.next_event,...sliced_next_array],
      };

    case 'TOGGLE_PAST_EVENT':
    let sliced_past_array = state.data.past_event.slice(state.past_event.length,state.past_event.length+4);
    return {
      ...state,
      past_view_more : state.past_event.length + 4 < state.data.past_event.length ? true : false,
      past_event : [...state.past_event,...sliced_past_array],
    };

    case 'NEXT_VIEW_MORE':
    return {
      ...state,
      next_view_more : true
    };

    case 'PAST_VIEW_MORE':
    return {
      ...state,
      past_view_more : true
    };


    default:
      return state
  }
}
