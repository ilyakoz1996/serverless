import { randomBytes } from "crypto";
import prisma from "@/lib/prisma"
import { IUser } from "@/core/types";

class UsersService {
  async getUsers(): Promise<IUser[]> {
    const users = await prisma.user.findMany();
    return users;
  }
  async getUserById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user: any = await prisma.user.findUnique({
      where: { email },
      include: {
        projects: true,
      },
    });
    return user;
  }
  async createUser(accessToken: string, email: string, title?: string | null, img?: string | null): Promise<IUser> {

    const existedUser = await this.checkIfUserExistsByEmail(email);

    if (existedUser) return existedUser;

    const prepareUser: { email: string, title?: string; img?: string; } = { email };
    if (title) prepareUser.title = title;
    if (img) prepareUser.img = img;

    const user = await prisma.user.create({
      data: {...prepareUser,
        sessions: {
            create: {
              accessToken: accessToken,
              refreshToken: randomBytes(64).toString('hex'),
          },
        }
      },
    });
    return user;
  }
  async updateUserById(id: string, title?: string, img?: string): Promise<IUser> {
    const prepareUser: { title?: string; img?: string } = {};
    if (title) prepareUser.title = title;
    if (img) prepareUser.img = img;

    const user = await prisma.user.update({
      where: { id },
      data: prepareUser,
    });
    return user;
  }
  async updateUserByEmail(email: string, title?: string, img?: string): Promise<IUser> {
    const prepareUser: { title?: string; img?: string } = {};
    if (title) prepareUser.title = title;
    if (img) prepareUser.img = img;

    const user = await prisma.user.update({
      where: { email },
      data: prepareUser,
    });
    return user;
  }
  async deleteUserById(id: string): Promise<IUser> {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  }
  async deleteUserByEmail(email: string): Promise<IUser> {
    const user = await prisma.user.delete({
      where: { email },
    });
    return user;
  }
  async checkIfUserExistsById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  async checkIfUserExistsByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }
}

export default UsersService;
