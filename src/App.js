import React, {Component} from "react";
import axios from "axios";
import {Button, Table} from "reactstrap";
import ReactPaginate from 'react-paginate';
class App extends  Component {
    componentDidUpdate() {

    }

    componentDidMount() {
        this.getData();






    };
    getData() {
        const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY ;
        const hash = '439f74c4cec09e810d9c31b1905c7fdd'
        axios.get("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d46ca53d4972445aac0ba6b7ba9c2c50&hash=439f74c4cec09e810d9c31b1905c7fdd").then(res => {
            this.setState({heroes : res.data} )
            this.setState({n:this.state.heroes['data']['results']});

            console.log(this.state.n)
            this.setState({slice:this.state.heroes['data']['results'].slice(this.state.offset, this.state.offset + this.state.perPage)})
            console.log(this.state.slice)
            this.setState({
                pageCount: Math.ceil(this.state.n / this.state.perPage),
                orgtableData : this.state.n,
                tableData:this.state.slice
            })
        })
        this.setState({n:this.state.heroes['data']});
    }
    constructor(props){
        super(props)
        this.state = {heroes:[],n:[],  offset: 1,
            tableData: [],
            orgtableData: [],
            perPage: 4,
            currentPage: 0,slice:[]}


        this.handlePageClick = this.handlePageClick.bind(this);

    }
    handlePageClick = (e) => {
        console.log(this.state.slice)
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            const data = this.state.orgtableData;

            this.setState({slice:data.slice(this.state.offset, this.state.offset + this.state.perPage)})
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                n:this.state.slice
            })
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        this.setState({slice:data.slice(this.state.offset, this.state.offset + this.state.perPage)})
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            n:this.state.slice
        })

    }
    render(){
        const mystyle = {
            height:"200px",width:"200px"
            // CSS CODE
        };
        return (

            <div>
                <Table>
                    <thead>
                    <tr>


                           Marvel Heroes

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {this.state.n && this.state.n.map((x, index) =>
                            <td>
                                <div >
                                    <div >
                                        <div >
                                            <img style={mystyle}src={x.thumbnail.path+'.'+x.thumbnail.extension}/>
                                        </div>
                                        <div >
                                            <div >{x.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>)}

                    </tr>
                    </tbody>
                </Table>

                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={onclick=this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>


        );}
}
export default App;
