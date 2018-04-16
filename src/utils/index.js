export const getHashParams = () => {
  let paramPairs = window.location.hash.substring(2).split('&')
  let hashParams = {}
  paramPairs.forEach(item => {
    let pair = item.split('=')
    hashParams[pair[0]] = pair[1]
  })

  return hashParams
}

export const openWindow = (url, width = 400, height = 600, name = 'authWindow') => {
  let screenLeft = 0
  let screenTop = 0
  let featuresArr = []

  if (typeof window.screenLeft !== 'undefined') {
    screenLeft = window.screenLeft
    screenTop = window.screenTop
  } else if (typeof window.screenX !== 'undefined') {
    screenLeft = window.screenX
    screenTop = window.screenY
  }

  const featuresDict = {
    toolbar: 'no',
    location: 'no',
    directories: 'no',
    left: screenLeft + (window.innerWidth - width) / 2,
    top: screenTop + (window.innerHeight - height) / 2,
    status: 'yes',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    width: width,
    height: height
  }

  for (const k in featuresDict) {
    if (featuresDict.hasOwnProperty(k)) {
      featuresArr.push(`${k}=${featuresDict[k]}`)
    }
  }
  const features = featuresArr.join(',')

  const win = window.open(url, name, features)

  if (win) {
    win.focus()
  }

  return win
}

export const getFeatureColor = (index) => {
  // const COLOR = {
  //   energy: 'hsla(14, 100%, 65%, 0.7)',
  //   danceability: 'hsla(64, 100%, 68%, 0.7)',
  //   valence: 'hsla(104, 100%, 62%, 0.7)',
  //   instrumentalness: 'hsla(154, 100%, 65%, 0.7)',
  //   speechiness: 'hsla(194, 100%, 63%, 0.7)',
  //   acousticness: 'hsla(244, 100%, 68%, 0.7)'
  // }
  //
  //

  // const COLORS = ['#b33771', '#52347e', '#ffec20', '#009760', '#f5ae3d', '#caec3c']
  //
  // return COLORS[index]

  const initHue = 289

  return `hsla(${initHue - (index * 34)}, 100%, 69%, 0.84)`

  // const COLOR = {
  //   energy: [201, 205, 13],
  //   danceability: [205, 41, 103],
  //   valence: [3, 205, 141],
  //   instrumentalness: [43, 103, 141],
  //   speechiness: [103, 41, 205],
  //   acousticness: [13, 301, 41]
  // }

  // const rgb = COLOR[feature].join(',')

  // return `rgb(${rgb})`
}

export const setSelectedStyle = (el) => {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected')
  } else {
    el.classList.add('selected')
  }
}
