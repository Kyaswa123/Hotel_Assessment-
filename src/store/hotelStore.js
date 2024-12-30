import { create } from "zustand";

const useHotelStore = create((set) => ({
  selectedHotel: null,
  bookingDetails: {},

  setSelectedHotel: (data) => set({ selectedHotel: data }),

  updateBookingDetails: (details) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...details },
    })),
  resetBooking: () =>
    set({
      selectedHotel: null,
      bookingDetails: {},
    }),
}));

export default useHotelStore;
