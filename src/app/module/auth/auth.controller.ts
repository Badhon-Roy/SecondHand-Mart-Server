import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  res.status(200).json({
    message: 'User is logged in successfully',
    success: true,
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    message: 'Access token is retrieved successfully',
    success: true,
    data: result,
  });
});

export const AuthControllers = {
  login,
  refreshToken,
};
