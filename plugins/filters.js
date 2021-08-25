import Vue from 'vue'

const SI = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
export default ({ store }, inject) => {
    Vue.filter('numberFormat', (value, decimals = 3) => new Intl.NumberFormat(
        store.state.preferences.global.lang, {
            style: 'decimal',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        },
    ).format(value));

    Vue.filter('shortNumber', (number, precision = 2) => {
        number = Number.parseFloat(number);

        if (number < 1) {
            return number;
        }

        const tier = Math.floor(Math.log10(number) / 3);

        if (tier === 0) {
            return number;
        }

        const suffix = SI[tier];
        const scale = 10 ** (tier * 3);
        const scaled = number / scale;
        const formatted = Number(scaled.toFixed(precision)) + suffix;

        return formatted;
    });
}