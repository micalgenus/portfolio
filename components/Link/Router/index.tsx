import { ComponentType } from 'react';
import { LinkProps, Router as RoutesRouter } from 'next-routes';
import routes from '@/routes';

export const Link: ComponentType<LinkProps> = routes.Link;
export const Router: RoutesRouter = routes.Router;
