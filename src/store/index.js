// Redux Toolkit: wishlist slice persisted to localStorage
import { configureStore, createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: saved,
  reducers: {
    toggle: (s, a) => (s.includes(a.payload) ? s.filter((i) => i !== a.payload) : [...s, a.payload]),
    clear: () => [],
  },
});

export const { toggle, clear } = wishlistSlice.actions;
const store = configureStore({ reducer: { wishlist: wishlistSlice.reducer } });
store.subscribe(() => localStorage.setItem('wishlist', JSON.stringify(store.getState().wishlist)));
export default store;
