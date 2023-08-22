import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface SearchSliceState {
    value: string | null;
}

const initialState: SearchSliceState = {
    value: ''
}

export const SearchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearchText: (state: SearchSliceState, action: PayloadAction<string | null>) => {

            state.value = action.payload;

        }
    }
})

export const { setSearchText } = SearchSlice.actions;

export default SearchSlice.reducer;