import React from "react";
import './picmanage.css'
import {connect} from "react-redux";
 class PicManage extends React.Component{

    componentDidMount() {
        this.props.dispatch({type:'getpicurl'})
    }

    render() {
        return(
            <div>
                <ul className='imglist'>
                {this.props.picurls.map(url=>{
                    return(
                        <li key={url}>
                            <img src={url} alt=""  style={{width:'240px',height:'140px'}}/>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    picurls: state.picurls
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(PicManage)