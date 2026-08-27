import {prisma} from "@/config/prisma";

class FileRepository {
  async create(data: {filename: string;originalName: string;mimeType: string;size: number;url: string;publicId: string;}) {
    return prisma.file.create({
      data,
    });
  }

  async findAll() {
    return prisma.file.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.file.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return prisma.file.delete({
      where: {
        id,
      },
    });
  }
}

export default new FileRepository();