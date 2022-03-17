import axios from 'axios'
import 'dotenv/config'

const API_URL = `${process.env.API_URL}/chart/release`

const config = {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
}

try {
  const res = await axios.get(API_URL, config)

  res.data.forEach((app) => {
    if (app.container_images_update_available) {
      console.log(app.name, 'has updates available')
      try {
        const res = await axios.post(
          `${API_URL}/upgrade`,
          {
            release_name: app.name,
          },
          config
        )
      } catch (err) {
        console.error(err)
      }
    }
  })
} catch (error) {
  console.error(error)
}
