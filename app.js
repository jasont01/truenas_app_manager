import axios from 'axios'
import cron from 'cron'
import 'dotenv/config'

const API_URL = `${process.env.API_URL}/chart/release`

const config = {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
}

const app = async () => {
  try {
    const res = await axios.get(API_URL, config)

    res.data.forEach((app) => {
      if (app.container_images_update_available) {
        console.log(app.name, 'has updates available')
        try {
          axios.post(
            `${API_URL}/upgrade`,
            {
              release_name: app.name,
            },
            config
          )
        } catch (err) {
          console.error(err)
        }
      } else {
        console.log(app.name, 'is up to date')
      }
    })
  } catch (error) {
    console.error(error)
  }
}

app()

const job = new cron.CronJob('0 0 2 * * 6', app, null, true, 'America/New_York')

job.start()
