import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { listingRouter } from '../module/listing/listing.route';
import { authRouter } from '../module/auth/auth.route';
import { categoryRouter } from '../module/category/category.route';
import { favoriteRouter } from '../module/favorite/favorite.route';
import { orderRouter } from '../module/order/order.route';
import { messageRouter } from '../module/message/message.route';
import { blogsRouter } from '../module/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/listings',
    route: listingRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/categories',
    route: categoryRouter,
  },
  {
    path: '/favorites',
    route: favoriteRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
  {
    path: '/messages',
    route: messageRouter,
  },
  {
    path: '/blogs',
    route: blogsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
