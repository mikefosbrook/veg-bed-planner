const API_HOST = import.meta.env.VITE_API_HOST;

export const getBeds = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_HOST}/beds/`);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      let data = await response.json();

      dispatch({ type: 'BEDS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'BEDS_FAIL', error });
    }
  };
};

export const deleteBed = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_HOST}/beds/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch({ type: 'DELETE_BED', payload: id });
    } catch (error) {
      if (error.message === 'Not Found') {
        error.message = `Unable to delete. Bed ID ${id} does not exist`;
      }
      dispatch({ type: 'BEDS_FAIL', error });
    }
  };
};

export const updateBed = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_HOST}/beds/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      let updatedBed = await response.json();

      dispatch({ type: 'UPDATE_BED', payload: updatedBed });
    } catch (error) {
      if (error.message === 'Not Found') {
        error.message = `Unable to update. Bed ID ${id} does not exist`;
      }
      dispatch({ type: 'BEDS_FAIL', error });
    }
  };
};

export const createBed = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_HOST}/beds/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      let newBed = await response.json();

      dispatch({ type: 'CREATE_BED', payload: newBed });
    } catch (error) {
      dispatch({ type: 'BEDS_FAIL', error });
    }
  };
};

export default {
  getBeds,
  deleteBed,
  updateBed,
  createBed,
};
