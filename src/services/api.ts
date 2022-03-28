import axios from 'axios'

export const ApiUploadParams = (key: string, raw: string) =>
  axios.post('https://mvm-api.test.mixinbots.com/', { key, raw })