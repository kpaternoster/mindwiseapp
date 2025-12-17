/**
 * Get current date in format "DD MMM YYYY"
 * @returns Formatted date string (e.g., "10 Nov 2025")
 */
export const getCurrentDate = (): string => {
    const today = new Date();
    const day = today.getUTCDate();
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
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Format a date object to "DD MMM YYYY"
 * @param date - Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
    const day = date.getUTCDate();
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
        date.setDate(today.getUTCDate() + i);
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[date.getDay()];
        
        dates.push({
            day: dayName,
            date: date.getUTCDate(),
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

/**
 * Format ISO date string (YYYY-MM-DD) to human-readable format
 * @param isoDateString - ISO date string (e.g., "2025-11-28")
 * @returns Human-readable date string (e.g., "Yesterday", "2 days ago", or formatted date)
 */
export const formatISODateToRelative = (isoDateString: string): string => {
    const date = new Date(isoDateString + 'T00:00:00'); // Add time to avoid timezone issues
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
    
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return formatDate(date);
};