import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\s+/g, '')

    const months = [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 ) or ( 2026-01-07 => 07 Jan 2026 )
    const slotDateFormat = (slotDate) => {
        if (!slotDate) {
            return 'Date not available';
        }
        
        // Check if date is in ISO format (YYYY-MM-DD)
        if (slotDate.includes('-') && !slotDate.includes('_')) {
            try {
                // Parse ISO date string (YYYY-MM-DD) manually to avoid timezone issues
                const dateParts = slotDate.split('-');
                if (dateParts.length === 3) {
                    const year = parseInt(dateParts[0], 10);
                    const month = parseInt(dateParts[1], 10);
                    const day = parseInt(dateParts[2], 10);
                    
                    // Validate the parsed values
                    if (!isNaN(year) && !isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                        return `${day} ${months[month]} ${year}`;
                    }
                }
            } catch (error) {
                // Fall through to try other formats or return original
            }
        }
        
        // Handle day_month_year format (e.g., "07_01_2026")
        if (slotDate.includes('_')) {
            try {
                const dateArray = slotDate.split('_');
                if (dateArray.length === 3) {
                    const day = dateArray[0];
                    const monthIndex = Number(dateArray[1]);
                    const year = dateArray[2];
                    
                    if (monthIndex >= 1 && monthIndex <= 12) {
                        return `${day} ${months[monthIndex]} ${year}`;
                    }
                }
            } catch (error) {
                // Fall through to return original
            }
        }
        
        // Return original if format is not recognized
        return slotDate;
    }

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider