export const bedsReducer = (state, { type, payload, error }) => {
  switch (type) {
    case 'REQUEST_BEDS':
      return {
        ...state,
        loading: true,
      };
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
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
