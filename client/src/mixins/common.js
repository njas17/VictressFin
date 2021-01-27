export const commonMixin = {
    methods: {
        getLocaleDate(date) {
            let d = new Date(date);
            return d.toLocaleDateString();
        }
    }
}