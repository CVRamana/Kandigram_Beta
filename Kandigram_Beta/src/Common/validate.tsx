export function validate(payload) {
    switch (payload.type) {
        case "email":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (this.props.password.match(passw)) { return true }
            else { return false }
            break
        case "password":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (this.props.password.match(passw)) { return true }
            else { return false }
            break
        case "username":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (this.props.password.match(passw)) { return true }
            else { return false }
            break

        case "mobile":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (this.props.password.match(passw)) { return true }
            else { return false }
            break
        case "name":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (this.props.password.match(passw)) { return true }
            else { return false }
            break
        default:
            return true

    }


}