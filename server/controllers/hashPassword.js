import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (hashedPassword) {
          return hashedPassword;
        }
    } catch (err) {
        console.log('error while hashing password', err);
    }

}

export default hashPassword;