export function toCapitalize(str?: string | null) {
    if (!str) {
        return null
    }
    return str.at(0).toUpperCase() + str.slice(1).toLowerCase()
}