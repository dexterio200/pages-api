import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import PageController from './pages/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    PageController
  ]
})

app.listen(port, () => console.log(`Listening on port ${port}`))