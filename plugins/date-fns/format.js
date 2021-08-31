import format from '@enso-ui/date/src/format.js';

export default ({ store }, inject) => {
    inject('format', (date, formatStr = null) => format(
        date,
        formatStr || store.state.meta.dateFormat,
        store.state.preferences.global.lang,
    ))
}
