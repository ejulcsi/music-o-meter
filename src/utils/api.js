import Spotify from 'spotify-web-api-js'
import {getFeatureColor} from './index.js'

let spotifyApi = new Spotify()

const PERIOD = {
  short: 'short_term',
  medium: 'medium_term',
  long: 'long_term'
}

export const getArtistInfo = (token, term) => {
  spotifyApi.setAccessToken(token)

  return new Promise(resolve => {
    spotifyApi.getMyTopArtists({time_range: PERIOD[term]}).then((data) => {
      let artists = []
      let genres = new Set()
      data.items.map(item => {
        artists.push({
          name: item.name,
          image: item.images[1].url,
          genres: new Set(item.genres)
        })

        item.genres.forEach(genre => {
          genres.add(genre)
        })
      })

      resolve({
        artists,
        genres
      })
    }, function (err) {
      console.error(err)
    })
  })
}

export const getTrackListInfo = (token, term = 'short') => {
  spotifyApi.setAccessToken(token)
  return new Promise(resolve => {
    spotifyApi.getMyTopTracks({time_range: PERIOD[term]}).then((data) => {
      let tracks = []
      data.items.forEach(item => {
        tracks.push({
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          image: item.album.images[1].url,
          id: item.id
        })
      })

      resolve({tracks})
    }, function (err) {
      console.error(err)
    })
  })
}

export const getRecentlyPlayedTracks = (token, term) => {
  spotifyApi.setAccessToken(token)

  return new Promise(resolve => {
    spotifyApi.getMyRecentlyPlayedTracks({time_range: PERIOD[term]}).then((data) => {
      let tracks = data.items.map(item => {
        return {
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          image: item.track.album.images[1].url,
          id: item.track.id,
          date: item.played_at
        }
      })

      resolve({tracks})
    }, function (err) {
      console.error(err)
    })
  })
}

export const getSingleTrackFeatures = (token, trackID) => {
  spotifyApi.setAccessToken(token)

  console.log('api trackID', trackID)

  return new Promise(resolve => {
    spotifyApi.getAudioFeaturesForTrack(trackID).then((data) => {
      const features = Object.keys(data).map((key, id) => {
        return {
          id,
          key,
          value: data[key]
        }
      })

      resolve({features})
    }, function (err) {
      console.error(err)
    })
  })
}

export const getMultipleTrackFeatures = (token, tracks) => {
  spotifyApi.setAccessToken(token)

  return new Promise(resolve => {
    spotifyApi.getAudioFeaturesForTracks(tracks).then((data) => {
      let features = new Set(['danceability', 'energy', 'valence',
        'speechiness', 'acousticness', 'instrumentalness'])
      let index = 0
      let featData = data.audio_features.reduce((acc, curr) => {
        Object.entries(curr).filter(item => features.has(item[0])).forEach(item => {
          const [key, value] = item
          if (!acc.has(key)) {
            acc.set(key, {
              index,
              data: []
            })
          }
          acc.get(key).data.push(value)

          index++
        })
        return acc
      }, new Map())

      resolve(featData)
    }, function (err) {
      console.error(err)
    })
  })
}
