import { JsonController, HttpCode, Post, Get, Put, Param, Body, NotFoundError } from 'routing-controllers'
import User from './entity'

type UserList = { users: User[] }

@JsonController()
export default class UserController {

    @Post('/users')
    @HttpCode(201)
    createPage(
        @Body() user: User
    ): Promise<User> {
        return user.save()
    }

    @Get('/users')
    async allPages(): Promise<UserList> {
        const users = await User.find()
        return { users }
    }

    @Get('/users/:id')
    getPage(
        @Param('id') id: number
    ): Promise<User | undefined> {
        return User.findOne(id)
    }

    @Put('/users/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ): Promise<User> {
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('Cannot find user')

        return User.merge(user, update).save()
    }
}