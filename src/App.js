import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import { DefaultLayout } from '~/layouts'

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map(({ path, element, layout }, index) => {
                    const Page = element
                    let Layout = DefaultLayout

                    if (layout) {
                        Layout = layout
                    } else if (layout === null) {
                        Layout = Fragment
                    }

                    return (
                        <Route
                            path={path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                            key={index}
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
