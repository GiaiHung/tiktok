import Following from '~/components/pages/Following'
import Home from '~/components/pages/Home'
import Profile from '~/components/pages/Profile'
import Upload from '~/components/pages/Upload'
import Search from '~/components/pages/Search'
import { HeaderOnly } from '~/layouts'

import config from '~/config'

const { home, following, profile, upload, search } = config.routes

const publicRoutes = [
    { path: home, element: Home },
    { path: following, element: Following },
    { path: profile, element: Profile },
    { path: upload, element: Upload, layout: HeaderOnly },
    { path: search, element: Search, layout: null },
]

export { publicRoutes }
