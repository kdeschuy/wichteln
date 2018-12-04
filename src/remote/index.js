import firebase from 'firebase/app'
import 'firebase/database'

import config from './config'

export default firebase.initializeApp(config)
