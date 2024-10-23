import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // TODO: Implement your admin guard logic here
  return true;
};
