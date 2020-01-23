export function validate(payload:any) {
    switch (payload.type) {
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.val)) { return true }
            else { return false }
            break

        case "password":
            var passw = /^[A-Za-z]\w{7,14}$/;
            if (payload.val.match(passw)) { return true }
            else { return false }
            break

        case "username":
            var letters = /^[A-Za-z]+$/;
            if (payload.val.match(letters)) { return true }
            else { return false }
            break

        case "mobile":
            var phoneno = /^\d{10}$/;
            if ((payload.val.match(phoneno))) { return true }
            else { return false }
            

        case "name":
            var letters = /^[A-Za-z]+$/;
            if(payload.val.match(letters)) { return true }
            else { return false }
            break

        default:
            return true

    }


}