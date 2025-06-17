import mongoose from 'mongoose'

// const password = process.argv[2]

const url = `mongodb://root:example@mongo:27017/`

mongoose.set('strictQuery',false)

mongoose.connect(url)

export default mongoose;