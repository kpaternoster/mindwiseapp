/**
 * Get current date in format "DD MMM YYYY"
 * @returns Formatted date string (e.g., "10 Nov 2025")
 */
export const getCurrentDate = (): string => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'short' });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
};

/**
 * Helper function to convert Date to ISO format (YYYY-MM-DD)
 */
export const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Format a date object to "DD MMM YYYY"
 * @param date - Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

/**
 * Generate an array of week dates centered around today
 * @returns Array of week date objects with day name, date, and selection state
 */
export interface WeekDate {
    day: string;
    date: number;
    fullDate: Date;
    isSelected: boolean;
}

export const generateWeekDates = (): WeekDate[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
    const dates: WeekDate[] = [];

    // Generate dates from Saturday to Friday (7 days)
    // Start from 3 days before today
    for (let i = -3; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[date.getDay()];
        
        dates.push({
            day: dayName,
            date: date.getDate(),
            fullDate: date,
            isSelected: i === 0, // Today is selected
        });
    }

    return dates;
};

/**
 * Get day name from date
 * @param date - Date object
 * @returns Short day name (e.g., "Mon", "Tue")
 */
export const getDayName = (date: Date): string => {
    return date.toLocaleString('en-US', { weekday: 'short' });
};
