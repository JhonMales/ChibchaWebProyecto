import axios from "axios"

const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'

export { backend_url }
