import Enum from '@enso-ui/enums'

const bootEnums = (enums, i18n) => {
    const obj = {}

    Object.keys(enums).forEach(
        (enumName) => (obj[enumName] = new Enum(enums[enumName], i18n))
    )

    return obj
}

export default bootEnums