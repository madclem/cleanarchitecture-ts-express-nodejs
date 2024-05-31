import 'reflect-metadata';

// Enable env config
import 'dotenv/config';

// inject dependencies
import './infrastructure/adapters/adapters.di';

// Start API
import './infrastructure/api';
