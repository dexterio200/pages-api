import { JsonController, HttpCode, Post, Get, Put, Param, Body } from 'routing-controllers'
import pagesById, { Page } from './data'

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    @Post('/pages')
    @HttpCode(201)
    createPage(
        @Body() body: Page
    ): Page {
        console.log(`Incoming POST body param:`, body)
        return body
    }

    @Get('/pages')
    getAllPages(): PageList {
        return { pages: Object.values(pagesById) }
    }

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ): Page {
        return pagesById[id]
    }

    @Put('/pages/:id')
    updatePage(
        @Param('id') id: number,
        @Body() body: Partial<Page>
    ): Page {
        console.log(`Incoming PUT body param:`, body)
        return pagesById[id]
    }
}