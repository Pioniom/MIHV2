'use client'
import { useState, useRef, useEffect } from 'react';
import Div from '../Div';

const DatePicker = ({ value, onChange, placeholder = 'Datum wählen', minDate, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      const dropdownHeight = 400;
      const spaceBelow = viewport.height - rect.bottom;
      const spaceAbove = rect.top;
      
      const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
      
      setShowAbove(shouldShowAbove);
      setDropdownPosition({
        top: shouldShowAbove ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingWeekDay = firstDay.getDay();

    const days = [];
    
    // Previous month's days
    for (let i = startingWeekDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (minDate && date < new Date(minDate)) return;
    if (maxDate && date > new Date(maxDate)) return;
    
    setSelectedDate(date);
    setIsOpen(false);
    onChange(date.toISOString().split('T')[0]);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (year) => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(year);
    setCurrentMonth(newMonth);
    setShowYearPicker(false);
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const endYear = currentYear + 10;
    const years = [];
    
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    
    return years;
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Div className="cs-date-picker">
      <button
        type="button"
        ref={triggerRef}
        className="cs-form_field cs-date-picker-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? 'cs-date-selected' : 'cs-date-placeholder'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <svg 
          className="cs-date-picker-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      {isOpen && (
        <Div 
          ref={dropdownRef}
          className={`cs-date-picker-dropdown ${showAbove ? 'cs-date-picker-dropdown--above' : ''}`}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            zIndex: 9999
          }}
        >
          <Div className="cs-date-picker-header">
            <button
              type="button"
              className="cs-date-picker-nav"
              onClick={() => navigateMonth(-1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            
            <button
              type="button"
              className="cs-date-picker-month-btn"
              onClick={() => setShowYearPicker(!showYearPicker)}
            >
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </button>
            
            <button
              type="button"
              className="cs-date-picker-nav"
              onClick={() => navigateMonth(1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </Div>

          {showYearPicker ? (
            <Div className="cs-date-picker-year-grid">
              {generateYearRange().map(year => (
                <button
                  key={year}
                  type="button"
                  className={`cs-date-picker-year ${
                    year === currentMonth.getFullYear() ? 'cs-date-picker-year--selected' : ''
                  }`}
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </button>
              ))}
            </Div>
          ) : (
            <>
              <Div className="cs-date-picker-weekdays">
                {weekDays.map(day => (
                  <span key={day} className="cs-date-picker-weekday">
                    {day}
                  </span>
                ))}
              </Div>

              <Div className="cs-date-picker-days">
                {days.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`cs-date-picker-day ${
                      !day.isCurrentMonth ? 'cs-date-picker-day--other-month' : ''
                    } ${
                      day.isToday ? 'cs-date-picker-day--today' : ''
                    } ${
                      day.isSelected ? 'cs-date-picker-day--selected' : ''
                    } ${
                      isDateDisabled(day.date) ? 'cs-date-picker-day--disabled' : ''
                    }`}
                    onClick={() => handleDateSelect(day.date)}
                    disabled={isDateDisabled(day.date)}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </Div>
            </>
          )}
        </Div>
      )}
    </Div>
  );
};

export default DatePicker;