import app from './app'
import { config } from './config/env'
import colors from 'colors'

app.listen(()=>{
    console.log(colors.green(`Server running on port'${config.port}`))
})