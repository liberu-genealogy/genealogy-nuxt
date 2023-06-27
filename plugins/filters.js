const SI = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export default function (context, inject) {
  inject('filters', {
    numberFormat(value, decimals = 3) {
      return new Intl.NumberFormat(context.store.state.preferences.global.lang, {
        style: 'decimal',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    },
    shortNumber(number, precision = 2) {
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
    },
  });
}