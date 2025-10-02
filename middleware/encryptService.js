import bcrypt from 'bcrypt';


async function hash () {
    if(!this.isModified('password')) return
    try {
        const hashTime = 10
        this.password = await bcrypt.hash(this.password, hashTime)

    } catch (error) {
        console.log(error);
        
    }
}

export default hash;
