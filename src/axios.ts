import md5 from 'md5'
import axios from 'axios'

const instanceAxios = axios.create({
	baseURL: 'https://api.valantis.store:41000/',
})

instanceAxios.interceptors.request.use((config) => {
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
	const password = 'Valantis'
	const authString = `${password}_${timestamp}`
	config.headers['X-Auth'] = md5(authString)

	return config
})

export default instanceAxios
