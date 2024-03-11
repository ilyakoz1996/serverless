import { NextApiRequest, NextApiResponse } from 'next';
import ProjectsService from './_services/_projects';

const projectsService = new ProjectsService()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.projectId) {
        const project = await projectsService.getProject(req.query.projectId as string);
        res.status(200).json(project);
      } else if (req.query.userId) {
        const projects = await projectsService.getProjectsByUserId(req.query.userId as string);
        res.status(200).json(projects);
      } else if (req.query.email) {
        const projects = await projectsService.getProjectsByUserEmail(req.query.email as string);
        res.status(200).json(projects);
      } else if (req.query.slug) {
        const project = await projectsService.getProjectBySlug(req.query.slug as string);
        res.status(200).json(project);
      } else {
        const projects = await projectsService.getProjects();
        res.status(200).json(projects);
      }
      break;
    case 'POST':
      const project = await projectsService.createProject(req.body.userId, req.body.slug, req.body.title, req.body.img, req.body.about, req.body.websiteUrl);
      res.status(201).json(project); // Created status code
      break;
    case 'PUT':
      if (req.query.projectId) {
        const project = await projectsService.updateProject(req.query.projectId as string, req.body.slug, req.body.title, req.body.img, req.body.about, req.body.websiteUrl);
        res.status(200).json(project);
      } else {
        res.status(400).json({ error: 'Missing project ID in request' });
      }
      break;
    case 'DELETE':
      if (req.query.projectId) {
        const project = await projectsService.deleteProject(req.query.projectId as string);
        res.status(200).json(project); // Consider returning a success message instead
      } else {
        res.status(400).json({ error: 'Missing project ID in request' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
