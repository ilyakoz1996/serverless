import prisma from "@/lib/prisma"
import UsersService from "./_users";
import WalletsService from "./_wallets";
import { IProject } from "@/core/types";

const walletsService = new WalletsService()
const usersService = new UsersService()

class ProjectsService {

  async getProjects(): Promise<IProject[]> {
    const projects: any = await prisma.project.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
        about: true,
        websiteUrl: true,
        wallet: true,
        products: true,
        paymentLinks: true
      }
    });
    return projects
  }
  async getProject(projectId: string): Promise<IProject | null> {
    const project: any = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
        about: true,
        wallet: true,
        products: true,
        paymentLinks: true,
        websiteUrl: true,
      }
    });
    return project
  }
  async getProjectsByUserId(userId: string): Promise<IProject[]> {
    const projects: any = await prisma.project.findMany({
      where: { userId: userId },
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
        about: true,
        websiteUrl: true,
        wallet: true,
        products: true,
        paymentLinks: true,
      }
    });

    return projects
  }
  async getProjectsByUserEmail(userEmail: string): Promise<IProject[]> {
    const user: any = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      const newUser = await usersService.createUser(userEmail, null, userEmail);
      const projects: any[] = await prisma.project.findMany({
        where: {
          userId: newUser.id,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          img: true,
          about: true,
          wallet: true,
          websiteUrl: true,
          products: true,
          paymentLinks: true,
        }
      });
      return projects;
    } else {
      const projects: any = await prisma.project.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          img: true,
          about: true,
          wallet: true,
          websiteUrl: true,
          products: true,
          paymentLinks: true,
        }
      });
      return projects;
    }
  }
  async getProjectBySlug(slug: string): Promise<IProject> {

    const project: any = await prisma.project.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
        about: true,
        websiteUrl: true,
        products: true,
        wallet: true,
        paymentLinks: true,
      },
    });
    return project;
  }
  async createProject(userId: string, slug: string, title: string, img?: string, about?: string, websiteUrl?: string): Promise<IProject> {

    const project: any = await prisma.project.create({ data: {
      userId,
      slug,
      title,
      img,
      about,
      websiteUrl
    }, select: {
      id: true,
      slug: true,
      title: true,
      img: true,
      about: true,
      websiteUrl: true,
      products: true,
      paymentLinks: true,
    } });
    const wallet = await walletsService.createWallet(project.id);
    return {...project, wallet: wallet};
  }
  async updateProject(
    projectId: string,
    slug?: string,
    title?: string,
    img?: string,
    about?: string,
    websiteUrl?: string,
  ): Promise<IProject> {

    const prepareProject: any = {};

    if (title) prepareProject.title = title;
    if (img) prepareProject.img = img;
    if (about) prepareProject.about = about;
    if (websiteUrl) prepareProject.websiteUrl = websiteUrl;

    const project: any = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: prepareProject,
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
        about: true,
        websiteUrl: true,
      }
    });
    return project;
  }
  async deleteProject(projectId: string): Promise<IProject> {
    const project: any = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return project;
  }

  // Helpers
  async incrementProjectBalance(projectId: string, amount: number) {
    // console.log("## addProjectBalance service");
    const balance = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        balance: {
          increment: Number(amount)
        }
      },
      select: {
        balance: true
      }
    });
    // console.log("###", balance);
    return balance;
  }
  async decrementProjectBalance(projectId: string, amount: number) {
    // console.log("## decrementProjectBalance service");
    const balance = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        balance: {
          decrement: Number(amount)
        }
      },
      select: {
        balance: true
      }
    });
    // console.log("###", balance);
    return balance;
  }
}

export default ProjectsService;
