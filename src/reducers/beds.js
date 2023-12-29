const initialState = {
  loading: true,
  error: null,
  beds: null,
  recentBed: null,
};

const beds = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case 'BEDS_SUCCESS':
      return {
        ...state,
        loading: false,
        beds: payload,
      };
    case 'BEDS_FAIL':
      return {
        ...state,
        loading: false,
        error,
      };
    case 'CREATE_BED':
      return {
        ...state,
        loading: false,
        beds: [...state.beds, payload],
        recentBed: payload,
      };
    case 'UPDATE_BED':
      return {
        ...state,
        loading: false,
        beds: state.beds.map((bed) => (bed.id === payload.id ? payload : bed)),
      };
    case 'DELETE_BED':
      return {
        ...state,
        loading: false,
        beds: state.beds.filter((bed) => bed.id !== payload),
      };
    case 'CLEAR_RECENT_BED':
      return {
        ...state,
        recentBed: null,
      };
    default:
      return state;
  }
};

export default beds;
