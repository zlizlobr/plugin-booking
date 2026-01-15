import { h, createContext } from 'preact';
import { useContext } from 'preact/hooks';

const BookingContext = createContext();

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return context;
};

export const useBookingContextOptional = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children, value }) => {
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
