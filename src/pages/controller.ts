import { JsonController, HttpCode, Post, Get, Put, Param, Body, NotFoundError } from 'routing-controllers'
import Page from './entity'

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    @Post('/pages')
    @HttpCode(201)
    createPage(
        @Body() page: Page
    ): Promise<Page> {
        return page.save()
    }

    @Get('/pages')
    async allPages(): Promise<PageList> {
        const pages = await Page.find()
        return { pages }
    }

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ): Promise<Page | undefined> {
        return Page.findOne(id)
    }

    @Put('/pages/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<Page>
    ): Promise<Page> {
        const page = await Page.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')

        return Page.merge(page, update).save()
    }
}