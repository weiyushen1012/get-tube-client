import config from '@/assets/config.json';

export function getEndpoint() {
  if (window.location.hostname === 'localhost') {
    return config.endpoints.development;
  } else {
    return config.endpoints.production;
  }
}
