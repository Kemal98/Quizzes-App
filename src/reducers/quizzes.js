const quizzesReducer = (
  state = {
    quizzes: [],
    quizzesAarchive: [],
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        quizzes: [action.data, ...state.quizzes],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // update quiz
    case "UPDATE_START":
      return { ...state, error: false, uploading: true };
    case "UPDATE_SUCCESS":
      const updatedQuizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.data.id) {
          return action.data;
        }
        return quiz;
      });
      return {
        ...state,
        quizzes: updatedQuizzes,
        uploading: false,
        error: false,
      };
    case "UPDATE_FAIL":
      return { ...state, error: true, uploading: false };

    case "REMOVE_QUIZ":
      const removeAction = state.quizzes.filter(
        (quiz) => quiz.id !== action.data
      );
      return {
        ...state,
        quizzes: removeAction,
      };
    // arhive update

    case "UPLOAD_ARCHIVE": {
      return {
        ...state,
        quizzesAarchive: [...state.quizzesAarchive, action.data],
      };
    }
    case "UPDATE_ARCHIVE": {
      return {
        ...state,
        quizzesAarchive: action.data,
        uploading: false,
        error: false,
      };
    }
    default:
      return state;
  }
};

export default quizzesReducer;
