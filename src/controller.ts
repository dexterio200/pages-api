import {Controller, Get} from 'routing-controllers'

@Controller()
export default class MainController {

    @Get("/hello")
    main() {
       return {
         hello: 'World'
       }
    }

}