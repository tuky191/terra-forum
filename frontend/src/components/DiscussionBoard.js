import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './Post'
import PostEditor from './PostEditor'
import Button from 'react-bootstrap/Button';
import { Modal } from 'antd';
import { DisconnectWallet } from './DisconnectWallet';


import styles from './index.module.css'

const DiscussionBoard = ({ onSubmit, posts }) => {
    const [text, setText] = useState('')
    const [subject, setSubject] = useState('')
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(true);
    const perPage = 30
    const [pageCount, setPageCount] = useState(0)
    const [pagePosts, setPagePosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        setPageCount(Math.ceil(posts.length / perPage))

        if (posts.length % perPage !== 0 && posts.length > perPage) {
            setPagePosts(
                posts.slice(
                    posts.length - (posts.length % perPage) - 1,
                    posts.length - 1
                )
            )

            setCurrentPage(pageCount - 1)
        } else if (posts.length % perPage === 0 && posts.length > perPage) {
            setPagePosts(posts.slice(posts.length - perPage, posts.length))
            setCurrentPage(pageCount)
        } else {
            setPagePosts(posts.slice(0, perPage))
            setCurrentPage(0)
        }

        return () => {
            setPagePosts([])
        }
    }, [posts])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const buildDate = (date) => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        return (
            months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        )
    }

    const addZero = (i) => {
        if (i < 10) {
            i = '0' + i
        }
        return i
    }

    const buildTime = (date) => {
        let hours = date.getHours()
        let mornOrNight = 'AM'

        if (hours > 12 && hours < 24) {
            hours -= 12
            mornOrNight = 'PM'
        }

        return (
            addZero(hours) +
            ':' +
            addZero(date.getMinutes()) +
            ' ' +
            mornOrNight +
            ' ' +
            date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]
        )
    }

    const submitPost = () => {
        onSubmit(subject, text)
        setText('')
        setSubject('')
        setIsModalVisible(false)
    }

    const onPageChange = ({ selected }) => {
        let offset = Math.ceil(selected * perPage)
        setPagePosts(posts.slice(offset, offset + perPage))
        setCurrentPage(selected)
    }

    return (
        <div className='container'>
            <div >
                <>
                <Button variant="outline-success" onClick={showModal} > Add Message </Button>{' '}
                <DisconnectWallet />
                </>
                <Modal
                    visible={isModalVisible}
                    confirmLoading={isModalLoading}
                    onOk={async () => {
                        try {
                            return await new Promise((resolve, reject) => {
                                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                                setIsModalLoading(true);
                                setIsModalVisible(false);
                            });
                        } catch {
                            return console.log('Oops errors!');
                        }
                    }}
                    onCancel={() => {
                        setIsModalVisible(false);
                    }}
                    footer={[
                        <div className='row pt-2'>
                            <div className='col'>
                                <button onClick={submitPost} className='btn btn-primary'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    ]}
                    >
                    <p> 
                         
                         
                    </p>
                    <React.Fragment>
                        <div className='row'>
                            <div className='col'>
                                <PostEditor text={text} setText={setText} subject={subject} setSubject={setSubject} />
                            </div>
                        </div>
                    </React.Fragment>    
                    
                </Modal>
            </div>   
            {pagePosts.map((post, idx) => {
                const newDate = buildDate(post.date)
                const newTime = buildTime(post.date)

                return (
                    <React.Fragment key={idx}>
                        <Post {...post} date={newDate} time={newTime} />
                        <hr className={`mt-0`} />
                    </React.Fragment>
                )
            })}


            <div className='d-flex justify-content-center mt-5'>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={5}
                    previousLabel='Previous'
                    nextLabel='Next'
                    breakLabel='...'
                    breakClassName='page-item'
                    onPageChange={onPageChange}
                    forcePage={currentPage}
                    containerClassName='pagination'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    nextClassName='page-item'
                    previousLinkClassName='page-link'
                    nextLinkClassName='page-link'
                />
            </div>
        </div>
    )
}

DiscussionBoard.defaultProps = {
    posts: []
}

DiscussionBoard.propTypes = {
    posts: PropTypes.array,
    onSubmit: PropTypes.func
}


export default DiscussionBoard