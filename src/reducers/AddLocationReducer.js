const AddLocation = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_LOCATION':
      console.log("Saving new location...");
      console.log(state.data);
      return {
        // update state here...
        // or refetch on POST success
      }
  }
}
