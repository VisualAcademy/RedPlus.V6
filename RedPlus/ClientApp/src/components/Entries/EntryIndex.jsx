﻿// @page "/Entries"
// @page "/Entries/Index"
import React, { Component } from 'react';
import axios from 'axios';

export class EntryIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            loading: true
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToCreate = this.navigateToCreate.bind(this);
        this.editBy = this.editBy.bind(this);
        this.deleteBy = this.deleteBy.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    // 페이지가 로드되었을 때 Web API 호출해서 JSON 데이터 가져오기: OnInitialized() 
    componentDidMount() {
        this.displayData();
    }

    render() {
        let contents = this.state.loading ? (
            <p><em>Loading...</em></p>
        ) : (
            this.renderEntriesTable(this.state.entries)
        );

        return (
            <>
                <h1>List <button className="btn btn-sm btn-primary"
                    onClick={this.navigateToCreate}><span className="fa fa-plus">+</span></button></h1>
                <div style={{ fontStyle: "italic" }}>게시판 리스트 페이지입니다.</div> 
                {contents}
            </>
        );
    }

    // 글쓰기 페이지로 이동
    navigateToCreate() {
        //const { history } = this.props;
        //history.push('/Entries/Create'); 
        this.props.history.push('/Entries/Create');
    }

    async displayData() {
        const response = await axios.get("/api/Entries");
        const data = response.data;
        if (data) {
            this.setState({ entries: data, loading: false });
        }
    }

    // 학습용 게시판 리스트 테이블 출력
    renderEntriesTable(entries) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Created</th>
                        <th>Action, Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>{entry.title}</td>
                            <td>{entry.name}</td>
                            <td>{entry.content}</td>
                            <td>{entry.created ? new Date(entry.created).toLocaleDateString() : "-"}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-sm btn-primary"
                                    onClick={() => this.editBy(entry.id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => this.deleteBy(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    editBy(id) {
        const { history } = this.props;
        history.push("/Entries/Edit/" + id);
    }

    deleteBy(id) {
        const { history } = this.props;
        history.push(`/Entries/Delete/${id}`);
    }
}
