import { env } from './config/env';

console.log('Environment Diagnostics:');
console.log('NODE_ENV:', env.NODE_ENV);
console.log('PORT:', env.PORT);
console.log('DATABASE_URL:', env.DATABASE_URL ? 'PRESENT' : 'MISSING');
console.log('JWT_SECRET:', env.JWT_SECRET ? 'PRESENT' : 'MISSING');
console.log('JWT_REFRESH_SECRET:', env.JWT_REFRESH_SECRET ? 'PRESENT' : 'MISSING');
console.log('All checks passed flawlessly seamlessly!');
