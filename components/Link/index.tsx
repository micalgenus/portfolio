import { ComponentType } from 'react';
import { LinkProps } from 'next-routes';
import routes from '@/routes';

export const Link: ComponentType<LinkProps> = routes.Link;
