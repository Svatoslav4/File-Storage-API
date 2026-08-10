import app from './app'
import { config } from './config/env'
import colors from 'colors'

app.listen(config.port,()=>{
    console.log(colors.green(`Server running on port http://localhost:${config.port}`))
})