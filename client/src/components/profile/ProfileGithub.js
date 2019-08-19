import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ getGithubRepos, userName, repos }) => {
  useEffect(() => {
    getGithubRepos(userName);
  }, [getGithubRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => {
          return (
            <div key={repo._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                  <ul>
                      <li className="badge badge-primary">
                          Stars:{repo.stargazers_count}
                      </li>
                      <li className="badge badge-dark">
                          Whatchers:{repo.watchers_count}
                      </li>
                      <li className="badge badge-light">
                          Forks:{repo.fork_count}
                      </li>
                  </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
