// Library
import React, { useState, useEffect, useRef } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

// Icon
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

// Components
import AccountItem from '~/components/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Propper'
import { useDebounce } from '~/hooks'
import * as apiServices from '~/services/search'

const cx = classNames.bind(styles)

function Search() {
    // Input
    const [searchValue, setSearchValue] = useState('')
    // Handmade hooks that will only update after 500ms, bc we don't want to send too many requests
    const debounced = useDebounce(searchValue, 500)
    const inputRef = useRef()

    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleShowResult = () => {
        setShowResult(false)
    }

    const handleOnchange = (e) => {
        const searchValue = e.target.value

        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value)
        }
    }

    const renderResult = (attributes) => (
        <div className={cx('search-result')} tabIndex="-1" {...attributes}>
            <PopperWrapper className={cx('wrapper-padding')}>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((item) => {
                    return <AccountItem key={item.id} data={item} />
                })}
            </PopperWrapper>
        </div>
    )

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }

        const getData = async () => {
            setLoading(true)
            const res = await apiServices.search(debounced)
            setSearchResult(res)
            setLoading(false)
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced])

    return (
        // Prevent tippy warning by wrap it around a div
        <div>
            <HeadlessTippy
                interactive
                visible={searchResult.length > 0 && showResult}
                onClickOutside={handleShowResult}
                render={renderResult}
            >
                <div className={cx('search')}>
                    {/* Input */}
                    <input
                        placeholder="Search video and accounts"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleOnchange}
                        onFocus={() => setShowResult(true)}
                        ref={inputRef}
                    />

                    {/* Loading and closing button */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <AiFillCloseCircle />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('loading')}>
                            <FaSpinner />
                        </button>
                    )}

                    {/* Search button */}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <AiOutlineSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
