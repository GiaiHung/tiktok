import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import { AiOutlineQuestionCircle, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai'
import { FiMoreVertical, FiMessageSquare, FiSettings, FiLogOut } from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'
import { MdGTranslate } from 'react-icons/md'
import { RiKeyboardBoxLine } from 'react-icons/ri'
import { Image } from '~/assets/images'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './Header.module.scss'
import images from '~/assets/images'
// Don't know why but don't remove it :))
// eslint-disable-next-line no-unused-vars
import { Wrapper as PopperWrapper } from '~/components/Propper'
import Button from '~/components/Button'
import Menu from '~/components/Propper/Menu/Menu'
import Search from '../Search'
import config from '~/config'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <MdGTranslate />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <AiOutlineQuestionCircle />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <RiKeyboardBoxLine />,
        title: 'Keyboard shorcuts',
    },
]

const USER_ITEMS = [
    {
        icon: <AiOutlineUser />,
        title: 'View profile',
        to: '/profile',
    },
    {
        icon: <FaCoins />,
        title: 'Get coins',
        to: '/coins',
    },
    {
        icon: <FiSettings />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FiLogOut />,
        title: 'Log out',
        separate: true,
        to: '/',
    },
]

const currentUser = true

const handleMenuChange = (menuItem) => {
    console.log(menuItem)
}

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Button text>Upload</Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Messages" animation="fade">
                                <button className={cx('user-btn')}>
                                    <FiMessageSquare />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" animation="fade">
                                <button className={cx('user-btn')}>
                                    <AiOutlineInbox />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? USER_ITEMS : MENU_ITEMS} onChange={handleMenuChange} hideOnClick={false}>
                        {currentUser ? (
                            <Image
                                src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752"
                                alt="user-avatar"
                                className={cx('user-avatar')}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FiMoreVertical />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
        //     <Button text rounded className={cx('get-app-btn')}>
        //     Get app
        // </Button>
    )
}

export default Header
