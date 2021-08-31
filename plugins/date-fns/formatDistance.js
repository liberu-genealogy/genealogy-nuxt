import formatDistance from '@enso-ui/date/src/formatDistance.js';

export default ({ store }, inject) => {
    inject('formatDistance', date => formatDistance(date, store.state.preferences.global.lang))
}