import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileByUserId } from "../../actions/profile";
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './profileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'



const Profile = ({
  match,
  getProfileByUserId,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId,match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
              <div class="profile-grid my-1">
                  <ProfileTop profile={profile}/>
                  <ProfileAbout profile={profile}/>
                  <div className="profile-exp bg-white p-2">
                      <h2 className="text-primary">Experience</h2>
                      {profile.experience.length>0?(<Fragment>
                          {profile.experience.map((experience)=>{
                             return <ProfileExperience key={experience._id} experience={experience}/>

                          })}
                      </Fragment>):(<h4>No experience credentials</h4>)}
                  </div>
                  <div className="profile-edu bg-white p-2">
                      <h2 className="text-primary">Education</h2>
                      {profile.education.length>0?(<Fragment>
                          {profile.education.map((education)=>{
                             return <ProfileEducation key={education._id} education={education}/>

                          })}
                      </Fragment>):(<h4>No Education credentials</h4>)}
                  </div>
                  {profile.githubusername&&(
                    <ProfileGithub userName={profile.githubusername}/>
                  )}
              </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByUserId }
)(Profile);
