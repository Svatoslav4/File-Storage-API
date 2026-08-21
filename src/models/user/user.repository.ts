import { prisma } from "@/config/prisma";

class UserRepository {
    async create(data:{email: string,password: string,name?: string}) {
        return prisma.user.create({
            data,
        })
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async finById(id: string) {
        return prisma.user.findUnique({
            where: {
                id
            },
            include: {
                files: true
            }
        })
    }

    async update(id: string,data: {email?: string,password?: string,name?: string,avatar: string}) {
        return prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: string) {
        return prisma.user.delete({
            where: {
                id
            }
        })
    }
}

export default new UserRepository()