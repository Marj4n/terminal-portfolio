import axios, { AxiosRequestConfig } from "axios"
import curlirize from "axios-curlirize"

export const curl = async (args: string[]): Promise<string> => {
  const url = args[0]
  if (!url) {
    return "Usage: curl [url]. Example: curl https://api.github.com"
  }

  const options: AxiosRequestConfig = {
    url,
    headers: {
      "User-Agent": "curl/7.79.1",
      Accept: "*/*",
    },
    maxRedirects: 0, // Disable automatic redirection
    validateStatus: (status) => status >= 200 && status <= 399, // Accept all 2xx and 3xx status codes
  }

  curlirize(axios)
  try {
    const response = await axios(options)
    const contentType = response.headers["content-type"]
    if (contentType && contentType.includes("application/json")) {
      return JSON.stringify(response.data, null, 2)
    } else {
      return response.data
    }
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return `Error executing curl command: ${error.message}`
  }
}
