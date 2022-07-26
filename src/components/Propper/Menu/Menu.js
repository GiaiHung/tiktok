import React, { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { Wrapper as PopperWrapper } from '~/components/Propper'
import PropTypes from 'prop-types'

import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import Header from './Header'

const cx = classNames.bind(styles)

function Menu({ children, items = [], onChange, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }])

    // Only show the last item, so when we push new items(children), it will be only thing shown
    const currentMenu = history[history.length - 1]

    // Return to first page when mouse hover outside
    const handleReset = () => setHistory((prev) => prev.slice(0, 1))

    // Back to last menu
    const handleOnBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    }

    // Map and return buttons
    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const { children, separate, to, icon, title } = item
            const isParent = !!children
            const classes = cx('more-btn-item', {
                separate: separate,
            })

            return (
                <Button
                    text
                    to={to}
                    leftIcon={icon}
                    className={classes}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, children])
                        } else {
                            onChange(item)
                        }
                    }}
                >
                    {title}
                </Button>
            )
        })
    }

    // Render out when tippy works
    const renderResult = (attributes) => (
        <div className={cx('more-result')} tabIndex="-1" {...attributes}>
            <div className={cx('menu-list')}>
                <PopperWrapper>
                    {/* Header and back button only shown when menu does have children */}
                    {history.length > 1 && <Header title={currentMenu.title} onBack={handleOnBack} />}
                    <div className={cx('menu-scroll')}>{renderItems()}</div>
                </PopperWrapper>
            </div>
        </div>
    )

    return (
        <Tippy
            interactive
            offset={[30, 0]}
            delay={[0, 700]}
            placement="bottom-start"
            onHide={handleReset}
            hideOnClick={hideOnClick}
            render={renderResult}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
}

export default Menu
