import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function openDrawer() {
  if (navigationRef.isReady() && navigationRef.current) {
    navigationRef.current.dispatch({ type: 'OPEN_DRAWER' });
  } else {
    console.warn('Navigation is not ready');
  }
}
