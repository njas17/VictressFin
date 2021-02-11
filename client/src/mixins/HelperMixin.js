

export const HelperMixin = {
    methods: {
        getLocaleDate(date = null, isDisplay = false) {
            // 1. insert with date - use correct format
            // 2. insert with empty date 
            //  a) current date
            //  b) skip (no insertion) -- shouldbe taken care outside of the function                
            // 3. display with date - use correct format
            // 4. display with empty date - return N/A     

            let d = (date != null) ? new Date(date) : new Date;
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            let newDate = new Date(d - tzoffset).toISOString().slice(0, 10);

            if (!isDisplay) return newDate;// for insertion
            else return (date === null) ? "N/A" : newDate; // for display
        }
    },
    filters: {
        truncate(text = '', len, suffix) {
            if (text.length > len) {
                return text.substring(0, len) + suffix;
            } else {
                return text;
            }
        },
    }
}