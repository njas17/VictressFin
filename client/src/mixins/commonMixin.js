export const commonMixin = {
    methods: {
        getLocaleDate(date) {
            let d = new Date(date);
            return d.toLocaleDateString();
        }
    },
    filters: {
        truncate: function (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    }
}