import axios from 'axios';
import { RegistryAddress } from '@/assets/statistic';

export const ApiUploadParams = (key: string, raw: string) => axios.post('https://mvm-api.test.mixinbots.com/', { key, raw, address: RegistryAddress });
