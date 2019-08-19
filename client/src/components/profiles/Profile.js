import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getAllProfile} from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profile = ({getAllProfile,profile:{profiles,loading}}) => {

    useEffect(()=>{
        getAllProfile();
    },[getAllProfile]);
return (
    <Fragment>
        {loading? <Spinner/>:<Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>
                Start to connect with other developers
            </p>
            <div className="profile-container">
                {profiles.length>0?(
                    profiles.map(profile=>(
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))

                ):<h4>No Profile Found</h4>}
            </div>
        </Fragment>}
    </Fragment>
)
}

Profile.propTypes = {
    getAllProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}


const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getAllProfile}) (Profile)
