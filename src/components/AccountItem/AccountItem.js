import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'
import { AiFillCheckCircle } from 'react-icons/ai'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
    const { avatar: img, full_name: name, nickname: username, tick } = data
    return (
        <Link to={`/@${username}`} className={cx('wrapper')}>
            <img className={cx('avatar')} src={img} alt={name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{name}</span>
                    {tick && <AiFillCheckCircle />}
                </h4>
                <p className={cx('username')}>{username}</p>
            </div>
        </Link>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
