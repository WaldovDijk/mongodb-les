import { ActionTypes, LoadingAction, ILoading } from '../../Actions/Index';

const loadingReducer = (
  state: ILoading = { loading: true },
  action: LoadingAction
): ILoading => {
  switch (action.type) {
    case ActionTypes.setLoad:
      return { loading: action.payload };
    case ActionTypes.setLoaded:
      return { loading: action.payload };
    default:
      return state;
  }
};

export default loadingReducer;
