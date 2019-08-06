import { JsonController, Post, Get, Put, Param, Body, NotFoundError } from 'routing-controllers'
import User from './entity'

type UserList = { users: User[] }

@JsonController()
export default class UserController {

    @Post('/users')
    async createUser(
        @Body() user: User
    ) {
        const { password, ...rest } = user
        const entity = User.create(rest)
        await entity.setPassword(password)
        return entity.save()
    }

    @Get('/users')
    async allUsers(): Promise<UserList> {
        const users = await User.find()
        return { users }
    }

    @Get('/users/:id')
    getUser(
        @Param('id') id: number
    ): Promise<User | undefined> {
        return User.findOne(id)
    }

    @Put('/users/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ): Promise<User> {
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('Cannot find user')

        return User.merge(user, update).save()
    }
}