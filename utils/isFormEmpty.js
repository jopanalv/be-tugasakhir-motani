const isFormEmpty = (form) => {
    const length = Object.keys(form).length
    if (length > 2) {
        if (!form.name || !form.email || !form.password || !form.role) {
            return true
        } else {
            return false
        }
    } else {
        if (!form.email || !form.password) {
            return true
        } else {
            return false
        }
    }
}

module.exports = { isFormEmpty };