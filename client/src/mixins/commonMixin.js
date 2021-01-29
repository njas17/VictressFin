export const CommonMixin = {
    methods: {
        getLocaleDate(date) {
            let d = new Date(date);
            return d.toLocaleDateString();
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