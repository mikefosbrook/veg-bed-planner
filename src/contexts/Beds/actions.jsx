const API_HOST = import.meta.env.VITE_API_HOST;

export const getBeds = async (dispatch) => {
  dispatch({ type: 'REQUEST_BEDS' });
  try {
    const response = await fetch(`${API_HOST}/beds/`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    let data = await response.json();

    if (data.length) {
      dispatch({ type: 'BEDS_SUCCESS', payload: data });
      return data;
    }

    // No match found on server
    dispatch({
      type: 'BEDS_FAIL',
      error: { message: 'Could not fetch bed data' },
    });

    return null;
  } catch (error) {
    dispatch({ type: 'BEDS_FAIL', error });
  }
};

export const deleteBed = async (dispatch, id) => {
  dispatch({ type: 'REQUEST_BEDS' });
  try {
    const response = await fetch(`${API_HOST}/beds/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      dispatch({
        type: 'BEDS_FAIL',
        error: { message: 'Could not fetch bed data' },
      });
      throw Error(response.statusText);
    }
    console.log('deleteBed', id);
    dispatch({ type: 'DELETE_BED', payload: id });

    return null;
  } catch (error) {
    if (error.message === 'Not Found') {
      error.message = `Unable to delete. Bed ID ${id} does not exist`;
    }
    dispatch({ type: 'BEDS_FAIL', error });
  }
};

export const updateBed = async (dispatch, id, data) => {
  dispatch({ type: 'REQUEST_BEDS' });
  try {
    const response = await fetch(`${API_HOST}/beds/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      dispatch({
        type: 'BEDS_FAIL',
        error: { message: 'Could not fetch bed data' },
      });
      throw Error(response.statusText);
    }

    let updatedBed = await response.json();

    dispatch({ type: 'UPDATE_BED', payload: updatedBed });

    return null;
  } catch (error) {
    if (error.message === 'Not Found') {
      error.message = `Unable to update. Bed ID ${id} does not exist`;
    }
    dispatch({ type: 'BEDS_FAIL', error });
  }
};

export const createBed = async (dispatch, data) => {
  dispatch({ type: 'REQUEST_BEDS' });
  try {
    const response = await fetch(`${API_HOST}/beds/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      dispatch({
        type: 'BEDS_FAIL',
        error: { message: 'Could not fetch bed data' },
      });
      throw Error(response.statusText);
    }

    let newBed = await response.json();

    dispatch({ type: 'CREATE_BED', payload: newBed });

    return null;
  } catch (error) {
    dispatch({ type: 'BEDS_FAIL', error });
  }
};
