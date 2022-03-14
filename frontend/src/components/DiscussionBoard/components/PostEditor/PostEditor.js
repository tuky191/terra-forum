import React from 'react'

import ReactQuill from 'react-quill'
import './editor.css'
import 'react-quill/dist/quill.snow.css'
import { Form, Input, Modal } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyCustomQuill from '../MyCustomQuill/MyCustomQuill';
import FileUpload from "../FileUpload/FileUpload"

const PostEditor = ({ setForumMessage }) => {


    const changeSubject = e => {
        setForumMessage((prevState => ({
            ...prevState,
            subject: e.target.value
        })))
    };

    const changeContent = (value) => {
        setForumMessage((prevState => ({
            ...prevState,
            content: value
        })))
    }

    const changeAttachement = (value) => {
        setForumMessage((prevState => ({
            ...prevState,
            attachement: prevState + ',' + value
        })))
    }

    return <div>
        <Form>
            <div className="modal-body">
                <div className="form-group">
                    <label>Title:</label>
                    <Form.Item> <Input onChange={changeSubject} /></Form.Item>
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <Form.Item><MyCustomQuill setText={changeContent}></MyCustomQuill></Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item><FileUpload changeAttachement={changeAttachement}/></Form.Item>
                </div> 
            </div>
        </Form>
           </div>
}

export default PostEditor