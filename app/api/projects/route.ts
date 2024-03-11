import ProjectsService from '../_services/_projects';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const projectsService = new ProjectsService()

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const projectId = searchParams.get('projectId')
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')
  const slug = searchParams.get('slug')
  if (projectId) {
    const project = await projectsService.getProject(projectId as string);
    return NextResponse.json(project);
  } else if (userId) {
    const projects = await projectsService.getProjectsByUserId(userId as string);
    return NextResponse.json(projects);
  } else if (email) {
    const projects = await projectsService.getProjectsByUserEmail(email as string);
    return NextResponse.json(projects);
  } else if (slug) {
    const project = await projectsService.getProjectBySlug(slug as string);
    return NextResponse.json(project);
  } else {
    const projects = await projectsService.getProjects();
    return NextResponse.json(projects);
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const project = await projectsService.createProject(body.userId, body.slug, body.title, body.img, body.about, body.websiteUrl);
  return NextResponse.json(project);
}
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const projectId = searchParams.get('projectId')
  const body = await req.json()
  if (projectId) {
    const project = await projectsService.updateProject(projectId as string, body.slug, body.title, body.img, body.about, body.websiteUrl);
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ error: 'Missing project ID in request' });
  }
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const projectId = searchParams.get('projectId')
  if (projectId) {
    const project = await projectsService.deleteProject(projectId as string);
    return NextResponse.json(project); 
  } else {
    return NextResponse.json({ error: 'Missing project ID in request' });
  }
}
