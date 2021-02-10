

export const HelperMixin = {
    methods: {
        getLocaleDate(date = null, isNA = false) {
            if (isNA) {
                let d = (date != null) ? new Date(date) : new Date;
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                return new Date(d - tzoffset).toISOString().slice(0, 10);
            }

            return '-- Not Specified --';
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