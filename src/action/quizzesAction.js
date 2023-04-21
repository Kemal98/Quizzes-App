export const uploadQuiz = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    // api
    dispatch({ type: "UPLOAD_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPLOAD_FAIL" });
  }
  console.log(data);
};

export const updateQuiz = (data) => async (dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    // api
    dispatch({ type: "UPDATE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATE_FAIL" });
  }
  console.log(data);
};

export const removeQuiz = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({ type: "REMOVE_QUIZ", data: id });
  } catch (error) {
    console.log(error);
  }
};

export const uploadQuizAarchive = (data) => async (dispatch) => {
  try {
    // api
    dispatch({ type: "UPLOAD_ARCHIVE", data: data });
  } catch (error) {}
};

export const updateQuizAarchive = (data) => async (dispatch) => {
  try {
    // api
    dispatch({ type: "UPDATE_ARCHIVE", data: data });
  } catch (error) {}
};
