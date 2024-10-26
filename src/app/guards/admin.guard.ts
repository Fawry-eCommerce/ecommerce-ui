import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // This is a mock implementation of an admin guard
  return true;
};
