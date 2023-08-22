import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseListData } from '../components/baseList/BaseListContainer';


export interface ListElementState {
    value: Array<{
        id: string,
        data: BaseListData
    }>
}

const initialState: ListElementState = {
    value: []
}

export const listElementSlice = createSlice({
    name: 'listElement',
    initialState,
    reducers: {
        increment: (state: ListElementState, action: PayloadAction<ListElementState>) => {
            const idx = state.value.findIndex((v) => v.id === action.payload.value[0].id);
            if (idx === -1) {
                state.value = [...state.value, action.payload.value[0]];
            }

        },
        decrement: (state, action: PayloadAction<ListElementState>) => {

            const oldValueIdx = state.value.findIndex((v) => v.id === action.payload.value[0].id);
            const value = [...state.value];
            value.splice(oldValueIdx, 1);
            state.value = [...value];
        }
    },
})


export const { increment, decrement } = listElementSlice.actions;

export default listElementSlice.reducer;