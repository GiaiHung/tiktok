import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    children,
    primary,
    outlined,
    text,
    small,
    large,
    disabled,
    rounded,
    leftIcon,
    rightIcon,
    className,
    ...props
}) {
    let Component = 'button'
    const classes = cx('wrapper', {
        primary,
        outlined,
        text,
        small,
        large,
        disabled,
        rounded,
        [className]: className,
    })

    if (to) {
        Component = Link
        props.to = to
    } else if (href) {
        Component = 'a'
        props.href = href
    }

    // Remove Event Listener
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outlined: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
}

export default Button
