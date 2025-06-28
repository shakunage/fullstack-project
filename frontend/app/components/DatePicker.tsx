import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const DatePickerComponent = ({ selectedDate, handleDateChange }: { selectedDate: Date; handleDateChange: (date: Date | string | null) => void; }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <button
        onClick={() => {
          const previousDay = dayjs(selectedDate).subtract(1, "day").toDate();
          handleDateChange(previousDay);
        }}
        className="text-blue-500 hover:text-blue-700"
      >
        {'◀︎'}
      </button>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        className="border p-2 rounded"
      />
      <button
        onClick={() => {
          const nextDay = dayjs(selectedDate).add(1, "day").toDate();
          handleDateChange(nextDay);
        }}
        className="text-blue-500 hover:text-blue-700"
      >
        {'▶︎'}
      </button>
    </div>
  );
};

export default DatePickerComponent;
